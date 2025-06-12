import prisma from '../src/config/db';
import bcrypt from 'bcrypt';

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Science' },
      { name: 'Math' },
      { name: 'History' },
    ],
  });

  const allCategories = await prisma.category.findMany();

  await prisma.subCategory.createMany({
    data: [
      { name: 'Space', categoryId: allCategories.find(c => c.name === 'Science')?.id || 1 },
      { name: 'Biology', categoryId: allCategories.find(c => c.name === 'Science')?.id || 1 },
      { name: 'Algebra', categoryId: allCategories.find(c => c.name === 'Math')?.id || 2 },
      { name: 'Geometry', categoryId: allCategories.find(c => c.name === 'Math')?.id || 2 },
      { name: 'Ancient', categoryId: allCategories.find(c => c.name === 'History')?.id || 3 },
    ],
  });

  const password = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { phone: '0500000000' },
    update: {},
    create: {
      name: 'admin',
      phone: '0500000000',
      password,
      role: 'ADMIN'
    }
  });

  console.log('✅ Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
