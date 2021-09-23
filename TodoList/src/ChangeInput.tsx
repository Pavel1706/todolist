import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type changeInputType={
    title:string
    onChange:(newTitle:string)=> void
}



export function ChangeInput(props:changeInputType){

    let [editMode, setEditMode]=useState(false)
    let [title, setTitle]=useState(props.title)

    function Active(){
        setEditMode(true)
        // setTitle(title)
    }
    function View(){
        setEditMode(false)
        props.onChange(title)
    }
    function change(e: ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value)
    }

    function EnterInput(e:KeyboardEvent<HTMLInputElement>){
        console.log(e.charCode)
        if(e.charCode===13) {
            // View()
            setEditMode(false)
            props.onChange(title)
        }
    }


    return  editMode
        ?  <TextField value={title} onBlur={View} onChange={change}
                  onKeyPress={EnterInput} autoFocus/>
        : <span onDoubleClick={Active}>{props.title}</span>
}