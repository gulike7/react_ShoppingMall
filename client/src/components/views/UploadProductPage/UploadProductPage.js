import React from 'react'
import {Typography, Button, Form, Input} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const{Title} = Typography;
const{TextArea} = Input;

    

function UploadProductPage(){
    
    const{Title, setTitle} = useState("")


    const titleChangeHandler = () =>{
    }




    return(
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>뷰티 상품 업로드</Title>
                 
            </div>
           
            <Form>

              {}
              <br/>
              <br/>
              <label>이름</label>
              <Input onChange={titleChangeHandler}/>
              <br/>
              <br/>
              <label>Description</label>
              <TextArea/>
              <br/>
              <br/>
                            
              <label>가격($)</label>
              <Input/>
              <br/>
              <br/>
              
              <select>
                  <option></option>
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