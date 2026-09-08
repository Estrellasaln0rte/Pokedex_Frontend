export const getPokemons = async (limit = 151) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const getPokemonDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};