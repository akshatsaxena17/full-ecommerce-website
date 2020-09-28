import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProducts } from '../actions/productActions';

function ProductScreen(props) {

    const [qty,setQty] = useState(1);
    
    // const product = data.products.find(x => x._id === props.match.params.id);

    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProducts(props.match.params.id));
        return () => {
            // cleanup
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
      };

    return (
        <div>
            <div className="back-to-results">
            <Link to="/">Back to results</Link>
        </div>
        {loading ? <div>loading ...</div>
        :
        error ? <div>{error}</div>
        :
        (
            <div className="details">
            <div className="details-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="details-info">
                <ul>
                    <li><h4>{product.name}</h4></li>
                    <li>{product.rating} Stars {product.numReviews} Reviews</li>
                    <li>$ {product.price}</li>
                    <li>Description :</li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>Price: ${product.price}</li>
                    <li>Status:</li>
                    <li>
                        Qty:<select vl={qty} onChange = {(e) => {setQty(e.target.value)}}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                        </select>
                    </li>
                    <li>
                        <button onClick={handleAddToCart} className="button primary">ADD TO CART</button>
                    </li>
                </ul>
            </div>
        </div>
        )

        }
        
        </div>)
}

export default ProductScreen;