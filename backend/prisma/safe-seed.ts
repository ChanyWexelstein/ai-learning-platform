import prisma from '../src/config/db';

async function main() {
  const categoryCount = await prisma.category.count();
  if (categoryCount > 0) {
    console.log('Skipping seed — categories already exist');
    return;
  }

  console.log('Seeding initial data...');
  await import('./seed');
}

main()
  .catch((e) => {
    console.error('Error running safe-seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
