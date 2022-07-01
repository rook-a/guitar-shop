import styles from './cart-content-empty.module.css';

function CartContentEmpty(): JSX.Element {
  return <h2 className={styles.text}>Корзина пуста</h2>;
}

export default CartContentEmpty;
