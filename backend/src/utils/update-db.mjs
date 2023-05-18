import pokemonData from './pokemon-filtered-details.json' assert { type: 'json' };
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getLimitedRows() {
  const limitedRows = await prisma.products.findMany({
    take: 999, // Limit the number of rows to 1000
  });

  const promises = [];

  // update pokemong images urls
  for (let i = 0; i < 999; i++) {
    // Update the row with the new data
    const response = await prisma.products.update({
      where: {
        uuid: limitedRows[i].uuid,
      },
      data: {
        imageUrl: pokemonData[i].sprites,
      },
    });
    promises.push(response);
  }
  await Promise.all(promises);
}

getLimitedRows()
  .catch((error) => {
    console.error('Error retrieving limited rows:', error);
  })
  .finally(() => {
    console.log('Done.');
    prisma.$disconnect();
  });
