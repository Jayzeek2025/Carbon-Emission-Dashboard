import "./Card.css";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <section className={`dashboard-card ${className}`}>
      {title && (
        <div className="dashboard-card__header">
          <h3 className="dashboard-card__title">{title}</h3>
        </div>
      )}

      <div className="dashboard-card__content">
        {children}
      </div>
    </section>
  );
}