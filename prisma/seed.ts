import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("test", 10);

  await prisma.user.create({
    data: {
      id: "user-1",
      email: "test@gmail.com",
      name: "Test User",
      username: "test",
      password,
    },
  });

  //https://source.unsplash.com/random?landscape
  await prisma.board.createMany({
    data: [
      {
        id: "board-1",
        name: "Test Board",
        slug: "test-board",
        ownerId: "user-1",
        public: true,
        image: { type: "color", value: "#1abc9c" },
      },
      {
        id: "board-2",
        name: "Test Board 2",
        slug: "test-board-2",
        ownerId: "user-1",
        public: false,
        image: {
          type: "image",
          value:
            "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTY5MzIyNjY3Mg&ixlib=rb-4.0.3&q=80&w=1080",
        },
      },
    ],
  });

  await prisma.user.update({
    where: { id: "user-1" },
    data: { starredBoards: { connect: { id: "board-2" } } },
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
