import { useEffect, useRef, useState } from 'react';
import { POKEMON_TYPES } from '../constants/pokemonTypes';
import '../styles/TypeFilter.css';

export const TypeFilter = ({ selectedTypes, onToggleType, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="type-filter" ref={containerRef}>
      <button
        type="button"
        className="type-filter-toggle"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Tipos{selectedTypes.length > 0 ? ` (${selectedTypes.length})` : ''}
      </button>

      {isOpen && (
        <div className="type-filter-panel" role="menu">
          <div className="type-filter-panel-header">
            <span>Filtrar por tipo</span>
            {selectedTypes.length > 0 && (
              <button type="button" className="type-filter-clear" onClick={onClear}>
                Limpiar
              </button>
            )}
          </div>
          <div className="type-orb-grid">
            {POKEMON_TYPES.map(({ name, label, color }) => {
              const selected = selectedTypes.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  className={`type-orb${selected ? ' selected' : ''}`}
                  style={{ '--type-color': color }}
                  onClick={() => onToggleType(name)}
                  aria-pressed={selected}
                >
                  <span className="type-orb-circle" />
                  <span className="type-orb-label">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
