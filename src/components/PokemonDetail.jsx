import { TYPE_COLORS } from '../utils/pokemonTypeColors';
import '../styles/PokemonDetail.css';

export const PokemonDetail = ({ pokemon, onBack, onPrev, onNext, hasPrev, hasNext }) => {
  if (!pokemon) {
    return (
      <div className="pokedex-screen-container">
        <div className="screen-inner detail-screen">
          <p className="detail-loading-text">Cargando...</p>
        </div>
      </div>
    );
  }

  const types = pokemon.types.map(t => t.type.name);

  return (
    <>
      <div className="pokedex-screen-container">
        <div className="screen-inner detail-screen">
          <div className="screen-leds" aria-hidden="true">
            <span className="led"></span>
            <span className="led"></span>
          </div>
          <div className="detail-sprite-frame">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <span className="screen-indicator" aria-hidden="true"></span>
          <span className="screen-grille" aria-hidden="true"></span>
        </div>

        <div className="device-controls">
          <div className="controls-row controls-row--deco" aria-hidden="true">
            <span className="deco-pill deco-pill--white"></span>
            <span className="deco-pill deco-pill--blue"></span>
          </div>

          <div className="controls-row">
            <button
              type="button"
              className="control-btn control-btn--home"
              onClick={onBack}
              aria-label="Volver al listado"
            >
              ◀
            </button>
            <div className="mini-screen">
              <span>Nº {pokemon.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="dpad" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <div className="pokedex-hinge" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="pokedex-info-panel">
        <div className="info-bezel">
          <h2 className="info-name">{pokemon.name}</h2>
        </div>

        <div className="info-type-grid">
          {types.map(type => (
            <span
              key={type}
              className="type-badge"
              style={{ backgroundColor: TYPE_COLORS[type] || '#777' }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="info-nav-row">
          <button
            type="button"
            className="nav-square"
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label="Pokémon anterior"
          >
            ◀
          </button>
          <button
            type="button"
            className="nav-square"
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Pokémon siguiente"
          >
            ▶
          </button>
          <span className="deco-dot" aria-hidden="true"></span>
        </div>

        <div className="info-readout-row">
          <div className="readout-box">
            <span className="readout-label">Altura</span>
            <span className="readout-value">{(pokemon.height / 10).toFixed(1)} m</span>
          </div>
          <div className="readout-box">
            <span className="readout-label">Peso</span>
            <span className="readout-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
          </div>
        </div>
      </div>
    </>
  );
};
