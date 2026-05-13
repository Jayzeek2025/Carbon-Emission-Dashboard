import "./LoadingState.css";

export default function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-state__header">
        <div className="loading-state__title skeleton" />
        <div className="loading-state__subtitle skeleton" />
      </div>

      <div className="loading-state__filters skeleton" />

      <div className="loading-state__cards">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="loading-state__card skeleton" key={index} />
        ))}
      </div>

      <div className="loading-state__content">
        <div className="loading-state__chart skeleton" />
        <div className="loading-state__side skeleton" />
      </div>
    </div>
  );
}