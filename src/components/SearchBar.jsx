import '../styles/SearchBar.css';

export const SearchBar = ({ onSearch }) => {
  return (
    <div className="dialog-box">
      <span className="dialog-text">Wild</span>
      <input 
        type="text" 
        className="dialog-input"
        maxLength="15"
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="dialog-text">appeared!</span>
      <span className="blinking-arrow">▼</span>
    </div>
  );
};