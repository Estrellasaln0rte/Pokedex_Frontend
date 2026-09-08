import { PokemonCard } from './PokemonCard';
import '../styles/PokemonGrid.css';

export const PokemonGrid = ({ pokemons, onSelect }) => {
  if (pokemons.length === 0) {
    return <p className="no-results">The Pokémon ran away...</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map(nombre => (
        <PokemonCard key={nombre} nombre={nombre} onSelect={onSelect} />
      ))}
    </div>
  );
};