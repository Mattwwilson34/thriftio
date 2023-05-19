const pokeData = require('./pokemon-details.json');
const typeData = require('./pokemon-types-data.json');
const fs = require('fs');

const fetchPokemonUrls = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const data = await response.json();

  fs.writeFile(
    './pokemon-urls.json.js',
    JSON.stringify(data, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
      console.log('file written successfully');
    }
  );
};

const fetchPokemonDetails = async () => {
  let pokePromises = [];

  for (let i = 1; i < 1000; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    pokePromises.push(data);
  }

  const data = await Promise.all(pokePromises);

  fs.writeFile(
    './pokemon-details.json',
    JSON.stringify(data, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
      console.log('file written successfully');
    }
  );
};

const filterPokeData = () => {
  let pokeArray = [];

  for (let i = 0; i < pokeData.length; i++) {
    const { name, id, types, sprites } = pokeData[i];
    let newPoke = {
      name,
      id,
      types: types.map((type) => type.type.name),
      sprites: sprites.other['official-artwork'].front_default,
    };
    pokeArray.push(newPoke);
  }

  fs.writeFile(
    './pokemon-filtered-details.json',
    JSON.stringify(pokeArray, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
      console.log('file written successfully');
    }
  );
};

const fetchPokeTypes = async () => {
  const promises = [];
  for (let i = 1; i < 19; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${i}`);
    const data = await response.json();
    promises.push(data);
  }
  const data = await Promise.all(promises);

  // write to file
  fs.writeFile(
    './pokemon-types-data.json',
    JSON.stringify(data, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
      console.log('file written successfully');
    }
  );
};
