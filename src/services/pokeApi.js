const API_URL = import.meta.env.VITE_API_URL;

export const getPokemons = async () => {
  const response = await fetch(`${API_URL}/pokemon`);
  const data = await response.json();
  return data.pokemons;
};

export const getPokemonDetails = async (nombre) => {
  const response = await fetch(`${API_URL}/pokemon/${nombre}`);
  return await response.json();
};

export const getPokemonesPorTipo = async (tipo) => {
  const response = await fetch(`${API_URL}/tipos/${tipo}`);
  if (!response.ok) return [];
  const data = await response.json();
  return data.pokemons;
};
