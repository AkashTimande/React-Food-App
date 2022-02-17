import {useContext, useState, useEffect} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

  const cartCtx= useContext(CartContext);
  const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);
  const numberOfCartItems = cartCtx.items.reduce((curNumer, item)=>{
    return curNumer + item.amount;
    },0);

  const {items} = cartCtx;

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump :''}`;

  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    },300)

    return() => {
      clearTimeout(timer);
    }
  },[items]);

  return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
  </button>
};

export default HeaderCartButton;
