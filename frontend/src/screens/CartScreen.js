import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom"
import { addToCart, removeFromCart } from '../actions/cartActions';
import Fade from "react-reveal/Fade"


function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler= (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
        return () => {
            // cleanup
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkOutHandler = () => {
        props.history.push("/signin");
    }

    return (
        <div className="cart">
            <div className="cart-list">
            <Fade bottom cascade>
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart is empty</div>
                        :
                        cartItems.map(item => 
                            <li key={item.id}>
                            <div className="cart-image"> 
                                <img src={item.image} alt="ptoduct" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                    <Link to={"/product"+item.product}>{item.name}</Link></div>
                                    <div>
                                        Qty:  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">${item.price}</div>
                    </li>
                        )
                    }
                </ul>
                </Fade>
            </div>
            <div className="cart-action">
                    <h3>
                        Subtotal ({cartItems.reduce((a, c) => a+c.qty, 0)} items)
                        :
                        ${cartItems.reduce((a, c) => a+c.price*c.qty, 0)}
                    </h3>
                    <button onClick={checkOutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                        Proceed to checkout
                    </button>
            </div>
        </div>
    )
}

export default CartScreen
