import React, { useEffect , useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox'
import { kinds } from './Sections/Datas'

function LandingPage() {
   
    const[Products, setProducts] = useState([])
    const[Skip, setSkip] = useState(0)
    const[Limit, setLimit] = useState(8)    // 8개를 먼저 가져옴
    const[PostSize, setPostSize] = useState(0)
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
               
                cover={<ImageSlider images={product.images}/>}
            >
            
                <Meta
                    title={product.title}
                    description={`${product.price} 원(₩)`} />
            </Card>
        </Col>
    })
    return (
       <div style={{width: '75%', margin: '3rem auto'}}>
           <div style={{textAlign: 'center'}}>
            <h2 style={{fontFamily:'bold italic large Palatino, serif'}}> <Icon type="crown"/>  KW Beauty Shop  <Icon type="crown"/></h2>
            <br/>
            </div>
            {}

            <Checkbox list ={kinds}/>
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
