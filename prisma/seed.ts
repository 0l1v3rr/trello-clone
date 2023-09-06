import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("test", 10);

  await prisma.user.createMany({
    data: [
      {
        id: "user-1",
        email: "test@gmail.com",
        name: "Test User",
        username: "test",
        password,
      },
      {
        id: "user-2",
        email: "john@gmail.com",
        name: "John Doe",
        username: "john",
        password,
      },
    ],
  });

  await prisma.board.createMany({
    data: [
      {
        id: "board-1",
        name: "Test Board",
        slug: "test-board",
        ownerId: "user-1",
        public: true,
        background: { type: "color", value: "#1abc9c" },
      },
      {
        id: "board-2",
        name: "Test Board 2",
        slug: "test-board-2",
        ownerId: "user-1",
        public: false,
        background: {
          type: "image",
          value:
            "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY5MzIyNjY3Mg&ixlib=rb-4.0.3&q=80&w=1080",
        },
      },
      {
        id: "board-3",
        name: "Test Board 3",
        slug: "test-board-3",
        ownerId: "user-2",
        public: false,
        background: { type: "color", value: "#e67e22" },
      },
    ],
  });

  await prisma.user.update({
    where: { id: "user-1" },
    data: {
      starredBoards: { connect: { id: "board-2" } },
      guestBoards: { connect: { id: "board-3" } },
    },
  });

  await prisma.label.createMany({
    data: [
      {
        id: "label-1",
        title: "Backend",
        color: "#6622cc",
        boardId: "board-2",
      },
      {
        id: "label-2",
        title: "Frontend",
        color: "#22ccaa",
        boardId: "board-2",
      },
    ],
  });

  await prisma.list.create({
    data: {
      id: "list-1",
      position: 1,
      title: "Backlog",
      boardId: "board-2",
      cards: {
        create: [
          {
            title: "Test card",
            description: "This is a test card with <b>HTML</b> formatting.",
            position: 1,
            labels: {
              connect: [{ id: "label-1" }, { id: "label-2" }],
            },
          },
          {
            title: "Another test card",
            position: 2,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
