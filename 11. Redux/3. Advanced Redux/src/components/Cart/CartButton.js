import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';

const CartButton = (props) => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    const handleShowCart = () => {
        dispatch(uiActions.toggleCart());
    }

    return (
        <button onClick={handleShowCart} className={classes.button}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalQuantity}</span>
        </button>
    );
};

export default CartButton;
