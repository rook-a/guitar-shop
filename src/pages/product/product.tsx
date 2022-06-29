import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ModalContainer from '../../components/modal-container/modal-container';
import CardAddModal from '../../components/modals/card-add-modal/card-add-modal';
import CardAddSuccessModal from '../../components/modals/card-add-success-modal/card-add-success-modal';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import Tabs from '../../components/tabs/tabs';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCommentsAction, resetCommentsCounter, selectComments } from '../../store/comments-slice/comments-slice';
import { fetchGuitarAction, selectGuitar } from '../../store/guitars-slice/guitars-slice';
import {
  changeCardAddModalActive,
  selectCardAddModalActive,
  selectCardAddSuccessModalActive,
} from '../../store/modal-slice/modal-slice';
import { setCurrentAddedProduct } from '../../store/order-slice/order-slice';

import { getPriceWithSpace } from '../../utils/utils';
import styles from './product.module.css';

function Product(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(selectGuitar);
  const comments = useAppSelector(selectComments);

  const isCardAddModalOpen = useAppSelector(selectCardAddModalActive);
  const isCardAddSuccessModalOpen = useAppSelector(selectCardAddSuccessModalActive);

  const selectGuitarId = Number(id);

  useEffect(() => {
    dispatch(resetCommentsCounter());
    dispatch(fetchGuitarAction(selectGuitarId));
    dispatch(fetchCommentsAction(selectGuitarId));
  }, [dispatch, selectGuitarId]);

  if (!guitar) {
    return null;
  }

  const { name, type, price, previewImg, rating, stringCount, vendorCode, description } = guitar;

  const handleButtonAddClick = () => {
    dispatch(setCurrentAddedProduct({ ...guitar, comments }));
    dispatch(changeCardAddModalActive(true));
  };

  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">{name}</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
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
        <div className={styles['img-container']}>
          <img className="product-container__img" src={`../../${previewImg}`} width="90" height="235" alt={name} />
        </div>
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
          <p className="product-container__price-info product-container__price-info--value">
            {getPriceWithSpace(price)} ₽
          </p>
          <button
            onClick={handleButtonAddClick}
            className="button button--red button--big product-container__button"
            type="button">
            Добавить в корзину
          </button>
        </div>
      </div>

      <Reviews />

      {isCardAddModalOpen && <ModalContainer children={<CardAddModal />} />}
      {isCardAddSuccessModalOpen && <ModalContainer className="modal--success" children={<CardAddSuccessModal />} />}
    </div>
  );
}

export default Product;
