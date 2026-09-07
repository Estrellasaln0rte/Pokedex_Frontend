import { PokemonCard } from './PokemonCard';
import '../styles/PokemonGrid.css';

export const PokemonGrid = ({ pokemons }) => {
  if (pokemons.length === 0) {
    return <p className="no-results">The Pokémon ran away...</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map(p => (
        <PokemonCard key={p.name} url={p.url} />
      ))}
    </div>
  );
};