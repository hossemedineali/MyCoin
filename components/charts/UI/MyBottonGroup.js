import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

const MyBottonGroup = (props) => {

    const [selectedperiodbutton, setselectedperiodbutton]=useState('1')
    const [selectedmodebutton, setselectedmodebutton]=useState('prices')

    

    function hundelClick(event){
        props.onclick(event)

        if(props.mode) setselectedmodebutton(event.target.id)
        if(props.Period) setselectedperiodbutton(event.target.id)
        
        
    }

    return ( <ButtonGroup>
        {props.btn.map(btn=>{
            return <Button key={btn.id} id={btn.id} onClick={hundelClick} 
            variant={selectedmodebutton==btn.id||selectedperiodbutton==btn.id? "contained":"outlined"}>{btn.value}</Button>
        })}
    </ButtonGroup> );
}
 
export default MyBottonGroup;