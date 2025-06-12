import prisma from '../src/config/db';

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

  console.log('✅ Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
