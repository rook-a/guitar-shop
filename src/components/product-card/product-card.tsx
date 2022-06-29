import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

import Rating from '../rating/rating';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { changeCardAddModalActive } from '../../store/modal-slice/modal-slice';
import { selectProducts, setCurrentAddedProduct } from '../../store/order-slice/order-slice';

import { Product } from '../../types/product';
import { adaptTypeToClient, getPriceWithSpace } from '../../utils/utils';

interface ProductCardProps {
  guitar: Product;
}

function ProductCard({ guitar }: ProductCardProps): JSX.Element {
  const link = generatePath('/product/:id', { id: `${guitar.id}` });
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const { id, name, rating, price, previewImg, type, comments } = guitar;

  const adaptedType = adaptTypeToClient(type);

  const handleButtonBuyClick = () => {
    dispatch(changeCardAddModalActive(true));
    dispatch(setCurrentAddedProduct(guitar));
  };

  return (
    <div className="product-card">
      <img src={`../../${previewImg}`} width="75" height="190" alt={`${adaptedType} ${name}`} />
      <div className="product-card__info">
        <Rating rating={rating} className={'product-card__rate'} currentPosition={'catalog'} comments={comments} />

        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {getPriceWithSpace(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={link}>
          Подробнее
        </Link>

        {id in products ? (
          <button className="button button--red-border button--mini button--in-cart" type="button">
            В Корзине
          </button>
        ) : (
          <button
            onClick={handleButtonBuyClick}
            className="button button--red button--mini button--add-to-cart"
            type="button">
            Купить
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
