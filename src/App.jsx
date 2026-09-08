import { useEffect, useRef, useState } from 'react';
import { getPokemonesPorTipo, getPokemons, getPokemonDetails } from './services/pokeApi';
import { SearchBar } from './components/SearchBar';
import { TypeFilter } from './components/TypeFilter';
import { PokemonGrid } from './components/PokemonGrid';
import { PokemonDetail } from './components/PokemonDetail';
import './App.css';

const PAGE_SIZE = 39; // múltiplo de 3 columnas: sin filas incompletas

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [typeNamesSet, setTypeNamesSet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const screenRef = useRef(null);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    getPokemons().then(results => setPokemons(results));
  }, []);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setTypeNamesSet(null);
      return;
    }

    let cancelado = false;
    Promise.all(selectedTypes.map(getPokemonesPorTipo)).then(listas => {
      if (cancelado) return;
      setTypeNamesSet(new Set(listas.flat()));
    });

    return () => { cancelado = true; };
  }, [selectedTypes]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleToggleType = (tipo) => {
    setSelectedTypes(prev =>
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
    setCurrentPage(1);
  };

  const handleClearTypes = () => {
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    screenRef.current?.scrollTo({ top: 0 });
  };

  const filteredPokemons = pokemons.filter(nombre =>
    nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!typeNamesSet || typeNamesSet.has(nombre))
  );
  const totalPages = Math.max(1, Math.ceil(filteredPokemons.length / PAGE_SIZE));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const visiblePokemons = filteredPokemons.slice(
    (currentPageSafe - 1) * PAGE_SIZE,
    currentPageSafe * PAGE_SIZE
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
        <div className="search-row">
          <SearchBar onSearch={handleSearch} />
          <TypeFilter
            selectedTypes={selectedTypes}
            onToggleType={handleToggleType}
            onClear={handleClearTypes}
          />
        </div>
        <div className="screen-inner" ref={screenRef}>
          <PokemonGrid pokemons={visiblePokemons} />
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => goToPage(currentPageSafe - 1)}
              disabled={currentPageSafe === 1}
              aria-label="Página anterior"
            >
              ◀
            </button>
            <span className="pagination-info">
              Página {currentPageSafe} de {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => goToPage(currentPageSafe + 1)}
              disabled={currentPageSafe === totalPages}
              aria-label="Página siguiente"
            >
              ▶
            </button>
        )}
      </div>
    </main>
  );
}

export default App;