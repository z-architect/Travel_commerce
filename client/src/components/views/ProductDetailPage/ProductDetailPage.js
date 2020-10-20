import React,{useEffect,useState} from 'react'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Col,Row} from 'antd';
import Axios from 'axios';
function ProductDetailPage(props) {
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState([])
    useEffect(()=>{
        console.log('id:',productId)
        console.log('reques:',`/api/product/products_by_id?id=${productId}&type=single`)
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single}`)
        .then(response=>{
            console.log('response.data[0]',response.data[0])
                setProduct(response.data[0])
        })
    },[])
    return (
        <div>
            <div style={{display:'flex' , justifyContent:'center'}}>
                <h2>{Product.title}</h2>
            </div>
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={Product}/>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetailPage
