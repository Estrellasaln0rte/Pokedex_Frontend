import { useEffect, useState } from 'react';
import { getPokemonDetails } from '../services/pokeApi';
import '../styles/PokemonCard.css';

export const PokemonCard = ({ nombre, onSelect }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonDetails(nombre).then(data => setPokemon(data));
  }, [nombre]);

  if (!pokemon) return <div className="card retro-card loading">...</div>;

  return (
    <button type="button" className="card retro-card" onClick={() => onSelect(nombre)}>
      <div className="card-header">
        <span className="pokemon-id">Nº {pokemon.id.toString().padStart(3, '0')}</span>
      </div>

      <div className="image-frame">
        <img
          src={pokemon.imagen}
          alt={pokemon.nombre}
        />
      </div>

      <div className="card-body">
        <h3 className="pokemon-name">{pokemon.nombre}</h3>
      </div>
    </button>
  );
};