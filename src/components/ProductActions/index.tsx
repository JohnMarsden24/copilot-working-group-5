import { useProduct } from '../../hooks/useProduct';
import { useCartContext } from '../../contexts/useCartContext';
import { Button } from '../ui/Button';
import styles from './ProductActions.module.css';

export const ProductActions = () => {
  const { data: product } = useProduct();
  const { addToCart } = useCartContext();
  const isOutOfStock = product?.stock === 0;

  return (
    <div className={styles.actions}>
      {isOutOfStock ? (
        <Button fullWidth disabled>
          Out of Stock
        </Button>
      ) : (
        <Button fullWidth onClick={() => product && addToCart(product)}>
          Add to Cart
        </Button>
      )}
    </div>
  );
};
