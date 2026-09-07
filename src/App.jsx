import { useEffect, useState } from 'react';
import { getPokemons } from './services/pokeApi';
import { SearchBar } from './components/SearchBar';
import { PokemonGrid } from './components/PokemonGrid';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Traemos 151 para la primera generación
    getPokemons(151).then(results => setPokemons(results));
  }, []);

  const filteredPokemons = pokemons.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokedex-device">
      <div className="pokedex-header">
        <div className="lens-blue"></div>
        <div className="lights">
          <div className="light red"></div>
          <div className="light yellow"></div>
          <div className="light green"></div>
        </div>
      </div>
      
      <div className="pokedex-screen-container">
        <SearchBar onSearch={setSearchTerm} />
        <div className="screen-inner">
          <PokemonGrid pokemons={filteredPokemons} />
        </div>
      </div>
    </div>
  );
}

export default App;