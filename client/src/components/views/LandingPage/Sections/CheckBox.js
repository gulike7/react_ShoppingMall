import React from 'react'
import { Collapse, Checkbox} from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {

    const renderCheckboxList = ()=> props.list && props.list.map((value, index) =>(
        <React.Fragment key={index}>
            <Checkbox onChange>
                <span>{value.name}</span>
            </Checkbox>
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
