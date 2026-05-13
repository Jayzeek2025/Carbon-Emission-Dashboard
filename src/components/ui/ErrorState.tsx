import "./ErrorState.css";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state">
      <div className="error-state__icon">!</div>

      <div>
        <h2 className="error-state__title">Unable to load dashboard data</h2>
        <p className="error-state__message">{message}</p>
      </div>

      <button className="error-state__button" type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}