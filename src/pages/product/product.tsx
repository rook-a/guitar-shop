import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Rating from '../../components/rating/rating';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCommentsAction } from '../../store/comments-slice/comments-slice';
import { fetchGuitarAction, selectGuitar } from '../../store/guitars-slice/guitars-slice';
import { AppRoute } from '../../utils/const';

function Product(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const guitar = useAppSelector(selectGuitar);

  const selectGuitarId = Number(id);

  useEffect(() => {
    dispatch(fetchGuitarAction(selectGuitarId));
    dispatch(fetchCommentsAction(selectGuitarId));
  }, [dispatch, selectGuitarId]);

  if (!guitar) {
    return null;
  }

  const { name, type, price, previewImg, rating, stringCount, vendorCode, description } = guitar;

  return (
    <div className="wrapper">
      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Главная
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link
                onClick={(evt) => {
                  evt.preventDefault();
                  navigate(`${AppRoute.Catalog}`);
                }}
                className="link"
                to="/">
                Каталог
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="/">
                {name}
              </a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={previewImg} width="90" height="235" alt={name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

              <Rating rating={rating} className={'product-container__rating'} isSmall={false} />

              <Tabs vendorCode={vendorCode} type={type} stringCount={stringCount} description={description} />
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
              <a className="button button--red button--big product-container__button" href="/">
                Добавить в корзину
              </a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a className="button button--red-border button--big reviews__sumbit-button" href="/">
              Оставить отзыв
            </a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.{' '}
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская Ксения</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет,
                хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая,
                в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла
                и ремня.{' '}
              </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button button--up button--red-border button--big reviews__up-button" href="#header">
              Наверх
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Product;
