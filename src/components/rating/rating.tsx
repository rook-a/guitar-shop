import { checkIsFull, stars } from '../../utils/utils';

interface RatingProps {
  rating: number;
  className: string;
  isSmall: boolean;
}

function Rating({ rating, className, isSmall }: RatingProps): JSX.Element {
  const star = {
    width: isSmall ? 12 : 14,
    height: isSmall ? 11 : 14,
  };

  return (
    <div className={`rate ${className}`}>
      {stars.map((number) => {
        return (
          <svg width={star.width} height={star.height} aria-hidden="true" key={number}>
            <use xlinkHref={checkIsFull(rating, number)}></use>
          </svg>
        );
      })}
      <p className="visually-hidden">Рейтинг: Хорошо</p>
      {isSmall && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>9
        </p>
      )}
    </div>
  );
}

export default Rating;
