import React, {useState} from 'react'
import { Collapse, Checkbox} from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) =>{
        // 누른 것의 Index를 구한 뒤, 전체 Checked 된 State에서 현재 누른 Checkbox가 존재하면 
        const currentIndex = Checked.indexOf(value)
        const newChecked =[...Checked]
        
        if (currentIndex === -1){   // 아니면 추가한다.
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex,1) //빼고,
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)        
    }

    const renderCheckboxList = ()=> props.list && props.list.map((value, index) =>(
        <React.Fragment key={index}>
            <Checkbox onChange={()=> handleToggle(value._id)} checked ={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>
            
        </React.Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Category" key="1">
                    
                    {renderCheckboxList()}
                    

                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
