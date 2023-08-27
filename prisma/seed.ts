const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("test", 10);

  await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name: "Test User",
      username: "test",
      password,
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
