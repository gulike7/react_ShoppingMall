import React, { useEffect , useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox'
import Radiobox from './Sections/RadioBox'
import { kinds, price } from './Sections/Datas'
import SearchFeature from './Sections/SearchFeature'

function LandingPage() {
   
    const[Products, setProducts] = useState([])
    const[Skip, setSkip] = useState(0)
    const[Limit, setLimit] = useState(8)    // 8개를 먼저 가져옴
    const[PostSize, setPostSize] = useState(0)
    const[Filters, setFilters] = useState({
        kinds: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        let body ={
            skip: Skip,
            limit: Limit
        }
       getProducts(body);

    },[])

    const getProducts = (body) =>{
        axios.post('/api/product/products',body)
        .then(response =>{
            if(response.data.success){
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                }
                else{
                setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            }else{
                alert("상품을 가져오는데 실패했습니다.")
            }
        })
    }
    const loadMoreHandler =()=>{
        
        let skip = Skip + Limit
        
        let body ={
            skip:skip,
            limit:Limit,
            loadMore: true
        }
      getProducts(body)
      setSkip(skip)
    }

    const renderCards = Products.map((product, index) =>{

        return <Col lg={6} md={8} xs={24}  key={index}>
            <Card
               
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
            >
            
                <Meta
                    title={product.title}
                    description={`${product.price} 원(₩)`} />
            </Card>
        </Col>
    })
    const showFilteredResults = (filters) =>{
        let body ={
            skip:0,
            limit:Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value)=>{
        const data = price;
        let array =[];

        for (let key in data){

            if(data[key]._id === parseInt(value,10)){
                array = data[key].array;
            }
        }
        return array;
    }


    const handleFilters = (filters, category) =>{
        const newFilters = {...Filters}
        newFilters[category] = filters
       

        if(category ==="price"){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm =(newSearchTerm)=>{
        setSearchTerm(newSearchTerm)
        let body ={
            skip:0,
            limit:Limit,
            filters:Filters,
            searchTerm:newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }


    return (
       <div style={{width: '75%', margin: '3rem auto'}}>
           <div style={{textAlign: 'center'}}>
            <h2 style={{fontFamily:'bold italic large Palatino, serif'}}> <Icon type="crown"/>  KW Beauty Shop  <Icon type="crown"/></h2>
            <br/>
            </div>
            {}
            <Row gutter={[16,16]}>

                <Col lg={12} xs={24}>
                    <Checkbox list={kinds} handleFilters={filters => handleFilters(filters, "kinds")} />
                </Col>
                <Col lg={12} xs={24}>
                <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                
                </Col>                    
            </Row>
            <div style={{display: 'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
            <SearchFeature
                refreshFunction={updateSearchTerm}/>
            </div>
            {}
            <Row gutter = {[16,16]}>
                {renderCards}
            </Row>
            <br/>

            {PostSize >= Limit && 
             <div style={{ display:'flex', justifyContent: 'center'}}>
             <button onClick={loadMoreHandler}>더보기</button>
         </div>
            }
      
       </div>

       
    )
}

export default LandingPage
