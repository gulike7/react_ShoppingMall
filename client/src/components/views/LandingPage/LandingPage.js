import React, { useEffect , useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
function LandingPage() {
   
    const[Products, setProducts] = useState([])
    const[Skip, setSkip] = useState(0)
    const[Limit, setLimit] = useState(8)    // 8개를 먼저 가져옴
  
    useEffect(()=>{
        let body ={
            skip: Skip,
            limit: Limit
        }
        axios.post('/api/product/products',body)
            .then(response =>{
                if(response.data.success){
                    setProducts(response.data.productInfo)
                }else{
                    alert("상품을 가져오는데 실패했습니다.")
                }
            })

    },[])

    const loadMoreHandler =()=>{
      
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
            {}
            <Row gutter = {[16,16]}>
                {renderCards}
            </Row>
            <br/>
            <div style={{ display:'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>


       </div>

       
    )
}

export default LandingPage
