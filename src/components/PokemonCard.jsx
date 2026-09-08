import { useEffect, useState } from 'react';
import { getPokemonDetails } from '../services/pokeApi';
import '../styles/PokemonCard.css';

export const PokemonCard = ({ url, onSelect }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonDetails(url).then(data => setPokemon(data));
  }, [url]);

  if (!pokemon) return <div className="card retro-card loading">...</div>;

  return (
    <button type="button" className="card retro-card" onClick={() => onSelect(url)}>
      <div className="card-header">
        <span className="pokemon-id">Nº {pokemon.id.toString().padStart(3, '0')}</span>
      </div>

      <div className="image-frame">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>

      <div className="card-body">
        <h3 className="pokemon-name">{pokemon.name}</h3>
      </div>
    </button>
  );
};