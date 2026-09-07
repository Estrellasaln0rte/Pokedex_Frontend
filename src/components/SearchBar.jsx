import '../styles/SearchBar.css';

export const SearchBar = ({ onSearch }) => {
  return (
    <div className="dialog-box">
      <label htmlFor="pokemon-search" className="visually-hidden">
        Buscar Pokémon por nombre
      </label>
      <span className="dialog-text">Wild</span>
      <input 
        type="text" 
        id="pokemon-search"
        className="dialog-input"
        maxLength="15"
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="dialog-text">appeared!</span>
      <span className="blinking-arrow">▼</span>
    </div>
  );
};
