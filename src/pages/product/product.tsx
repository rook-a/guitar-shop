import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCommentsAction, selectComments } from '../../store/comments-slice/comments-slice';
import { fetchGuitarAction, selectGuitar } from '../../store/guitars-slice/guitars-slice';
import { AppRoute } from '../../utils/const';

function Product(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const guitar = useAppSelector(selectGuitar);
  const comments = useAppSelector(selectComments);

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
                  navigate(`${AppRoute.Main}`);
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
            <img className="product-container__img" src={`../../${previewImg}`} width="90" height="235" alt={name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

              <Rating
                rating={rating}
                className={'product-container__rating'}
                currentPosition={'product'}
                comments={comments}
              />

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

          <Reviews comments={comments} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Product;
