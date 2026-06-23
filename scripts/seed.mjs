import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@classicpoly.com';
  const password = await bcrypt.hash('Admin123!', 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email,
        password,
        name: 'Chandrashekar T Anchan',
      }
    });
    console.log('✅ Admin user created successfully.');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
