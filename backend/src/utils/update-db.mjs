import pokemonData from './pokemon-filtered-details.json' assert { type: 'json' };
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getLimitedRows() {
  const limitedRows = await prisma.products.findMany({
    take: 999, // Limit the number of rows to 1000
  });

  const promises = [];

  // regex to match image url of pokemon facing forward
  const regex =
    /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/sprites\/pokemon\/([1-9]|[1-9][0-9]{1,2}|[1-9][0-9]{3})\.png$/;

  // update pokemong images urls
  for (let i = 0; i < 999; i++) {
    // Update the row with the new data
    const response = await prisma.products.update({
      where: {
        uuid: limitedRows[i].uuid,
      },
      data: {
        imageUrl: pokemonData[i].sprites.filter((sprite) =>
          regex.test(sprite)
        )[0],
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
