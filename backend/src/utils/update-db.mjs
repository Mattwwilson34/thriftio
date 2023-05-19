import pokemonData from './pokemon-filtered-details.json' assert { type: 'json' };
import pokemonTypes from './pokemon-types-data.json' assert { type: 'json' };
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// function to add data to product tables
async function getLimitedRows() {
  const limitedRows = await prisma.products.findMany({
    take: 999, // Limit the number of rows to 1000
  });

  const promises = [];

  for (let i = 0; i < 999; i++) {
    // Update the row with the new data
    const response = await prisma.products.update({
      where: {
        uuid: limitedRows[i].uuid,
      },
      data: {
        poketypes: pokemonData[i].types.join(','),
      },
    });
    promises.push(response);
  }
  await Promise.all(promises);
}

// getLimitedRows()
//   .catch((error) => {
//     console.error('Error retrieving limited rows:', error);
//   })
//   .finally(() => {
//     console.log('Done.');
//     prisma.$disconnect();
//   });

const filterPokeTypes = async () => {
  const typesArray = [];
  pokemonTypes.forEach((type) => {
    typesArray.push({ type: type.name });
  });

  const type = await prisma.types.createMany({
    data: [...typesArray],
  });

  console.log(type);
};

// function to create many to many relationship
const createPokemonTypeRelationships = async () => {
  const dbPokemon = await prisma.products.findMany();
  const dbTypes = await prisma.types.findMany();

  for (let i = 0; i < dbPokemon.length; i++) {
    const pokemonTypes = dbPokemon[i].poketypes.split(',');

    for (let j = 0; j < pokemonTypes.length; j++) {
      const matchingType = dbTypes.find(
        (type) => type.type === pokemonTypes[j]
      );
      // console.log('poketype', pokemonTypes[j], 'matchingType', matchingType)
      await prisma.productTypeMapping.create({
        data: {
          productId: dbPokemon[i].uuid,
          typeId: matchingType.uuid,
        },
      });
    }
  }
};

// function to test many to many relationship
// created with prisma
const getPokemon = async () => {
  const poke = await prisma.products.findMany({
    where: {
      types: {
        some: {
          type: {
            type: 'grass',
          },
        },
      },
    },
  });
  poke.forEach((pokemon) => console.log(pokemon.name))
};
getPokemon()
