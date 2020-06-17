import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload'
const{ TextArea } = Input;

const Kinds =[
    {key:1, value:"고데기"}, 
    {key:2, value:"롤빗"},
    {key:3, value:"샴푸"},
    {key:4, value:"염색제"},
    {key:5, value:"크림"},
    {key:6, value:"트리트먼트"},
    {key:7, value:"픽서"}
]

function UploadProductPage(){
    
    const[Title, setTitle] = useState("")
    const[Description, setDescription] = useState("")
    const[Price, setPrice] = useState(0)
    const[Kind, setKind] = useState(1) // 상품종류
    const[Images,setImages] = useState([])
    


    const titleChangeHandler = (event) =>{
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) =>{
        setPrice(event.currentTarget.value)
    }

    const kindChangeHandler = (event) =>{
        setKind(event.currentTarget.value)
    }

    const imageChangeHandler = (event) =>{
        setImages(event.currentTarget.value)
    }


    return(
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2>뷰티 상품 업로드</h2>
                 
            </div>
           
            <Form>

              {}

              <FileUpload></FileUpload>
              <br/>
              <br/>
              <label>이름</label>
              <Input onChange={titleChangeHandler} value={Title}/>
              <br/>
              <br/>
              <label>Description</label>
              <TextArea onChange={descriptionChangeHandler} value={Description}/>
              <br/>
              <br/>
              <label>가격(Won)</label>
              <Input type="number" onChange={priceChangeHandler} value ={Price}/>
              <br/>
              <br/>
              <select onChange={kindChangeHandler} value ={Kind}>
                  {Kinds.map(item=> (
                      <option key={item.key} value={item.key}>{item.value}</option>
                  ))}
                  
              </select>
              <br/>
              <br/>
              <Button>
                  확인
              </Button>
             
              
            </Form>
           </div>
    )
}

export default UploadProductPage