import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { listProducts } from '../actions/productActions';
import Fade from "react-reveal";
import Rating from './Rating';

function HomeScreen() {

    // const [products, setProducts] = useState([]);
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //     const {data} = await axios.get('/api/products');
        //     setProducts(data);
        // }
        // fetchData();
        
        dispatch(listProducts());

        return () => {
            // cleanup
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        loading ? <div>Loading...</div>
        :
        error ? <div>{error}</div>
        :
        <Fade bottom cascade>
        <ul className="products">
        {
            products.map(product => (
            <li key={product._id}>
                <div className="product">
                    <Link to={'/product/' + product._id}>
                        <img className="product-image" src={product.image} alt={product.name} />
                    </Link>
                        <div className="info">
                        <Link to={'/product/' + product._id}><div className="product-name">{product.name}</div></Link>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-price">$ {product.price}</div>
                        <div className="product-rating"><Rating
                            value={product.rating}
                            text={product.numReviews + ' reviews'}
                        /></div>
                        </div>
                </div>
            </li>
            ))
        }
        </ul>
        </Fade>
                
    )
}

export default HomeScreen;
