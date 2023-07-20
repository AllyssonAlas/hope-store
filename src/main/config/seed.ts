import './module-alias';

import { PrismaClient } from '@prisma/client';

import { permissionsList, rolesList } from '@/main/enums';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.deleteMany({});
  await prisma.permission.deleteMany({});

  await prisma.role.createMany({
    data: rolesList.map(role => ({ name: role })),
  });

  for (const permission of permissionsList) {
    await prisma.permission.create({
      data: {
        name: permission.name,
        roles: {
          connect: permission.roles.map(role => ({ name: role })),
        },
      },
    });
  }
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
