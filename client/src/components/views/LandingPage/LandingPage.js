
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import { Card, Icon, Col, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;
function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products);
                        console.log(response.data.products);
                    }

                    setPostSize(response.data.postSize);
                    //alert("fetched data correctly");
                }
                else {
                    alert('failed to fetch product data');
                }
            })
    }
    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit
        }
        getProducts(variables);

    }, [])
    const renderCards = Products.map((product, index) => (
        <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`} />
            </Card>


        </Col>
    ))
    const onLoadMore = () => {
        let skip = Skip + Limit;
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(variables);
        setSkip(skip);

    }
    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            console.log('key', key);
            if (data[key]._id === parseInt(value, 10))
                array = data[key].array;
        }
        console.log('aray:', array)
        return array;
    }
    const handleFilters = (filters, category) => {
        console.log(filters);
        const newFilters = { ...Filters };

        newFilters[category] = filters;
        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }
        console.log("aboveshowfiltersdresluts", newFilters)
        showFilteredResults(newFilters);
        setFilters(newFilters);
    }
    const showFilteredResults = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(variables);
    }
    const updateSearchTerm = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0);
        setSearchTerms(newSearchTerm);
         console.log('sentterm:',newSearchTerm);
         console.log('variables:',variables)
        getProducts(variables);

    }
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Lets travel Anywhere <Icon type="rocket" /></h2>
            </div>
           
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox handleFilters={filters => handleFilters(filters, "continents")} list={continents} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox handleFilters={filters => handleFilters(filters, "price")} list={price} />
                </Col>
            </Row>


            
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            {
                Products.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No Posts Yet...</h2>
                    </div>

                    :
                    <div>
                        <Row gutter={[16, 16]}>
                            {
                                renderCards
                            }
                        </Row>
                    </div>
            }
            <br /><br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }

        </div>
    )
}

export default LandingPage
        