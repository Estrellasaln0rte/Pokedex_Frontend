export const getPokemons = async (limit = 151) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

// Esta es la función que te falta agregar y exportar:
export const getPokemonDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};