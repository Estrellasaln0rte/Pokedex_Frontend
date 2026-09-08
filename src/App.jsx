import { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetails } from './services/pokeApi';
import { SearchBar } from './components/SearchBar';
import { PokemonGrid } from './components/PokemonGrid';
import { PokemonDetail } from './components/PokemonDetail';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    // Traemos 151 para la primera generación
    getPokemons(151).then(results => setPokemons(results));
  }, []);

  useEffect(() => {
    if (!selectedUrl) {
      setSelectedPokemon(null);
      return;
    }

    let cancelled = false;
    getPokemonDetails(selectedUrl).then(data => {
      if (!cancelled) setSelectedPokemon(data);
    });

    return () => {
      cancelled = true;
    };
  }, [selectedUrl]);

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDetailOpen = Boolean(selectedUrl);
  const selectedIndex = pokemons.findIndex(p => p.url === selectedUrl);
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex !== -1 && selectedIndex < pokemons.length - 1;

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

      <div className="pokedex-panels">
        {isDetailOpen ? (
          <PokemonDetail
            pokemon={selectedPokemon}
            onBack={() => setSelectedUrl(null)}
            onPrev={() => hasPrev && setSelectedUrl(pokemons[selectedIndex - 1].url)}
            onNext={() => hasNext && setSelectedUrl(pokemons[selectedIndex + 1].url)}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        ) : (
          <div className="pokedex-screen-container">
            <SearchBar onSearch={setSearchTerm} />
            <div className="screen-inner">
              <PokemonGrid pokemons={filteredPokemons} onSelect={setSelectedUrl} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;