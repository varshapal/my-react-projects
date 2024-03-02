import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const params = useParams();

    console.log(params.productId);
    return(
        <section>
            <h1>Product Detail</h1>
            <p>Product</p>
            <p>{params.productId}</p>
            <p>Product Reviews</p>
        </section>
        
    )
};

export default ProductDetail;