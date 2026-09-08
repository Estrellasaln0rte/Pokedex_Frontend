import { useEffect, useState } from 'react';
import { getPokemons } from './services/pokeApi';
import { SearchBar } from './components/SearchBar';
import { PokemonGrid } from './components/PokemonGrid';
import './App.css';

const PAGE_SIZE = 40;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    getPokemons().then(results => setPokemons(results));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setVisibleCount(PAGE_SIZE);
  };

  const filteredPokemons = pokemons.filter(nombre =>
    nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visiblePokemons = filteredPokemons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPokemons.length;

  return (
    <main className="pokedex-device">
      <header className="pokedex-header">
        <h1 className="pokedex-titulo">Pokédex</h1>
        <div className="lens-blue"></div>
        <div className="lights">
          <div className="light red"></div>
          <div className="light yellow"></div>
          <div className="light green"></div>
        </div>
      </header>
      
      <div className="pokedex-screen-container">
        <SearchBar onSearch={handleSearch} />
        <div className="screen-inner">
          <PokemonGrid pokemons={visiblePokemons} />
          {hasMore && (
            <button
              className="load-more-btn"
              onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
            >
              Cargar más
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;