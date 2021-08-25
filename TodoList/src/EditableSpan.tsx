import {ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange:(value:string)=> void

}

export function EditableSpan(props: EditableSpanPropsType) {
    let[editMode, setEditMode]= useState(false)
    let[title, setTitle]=useState(props.title)

    const activateEditMode=()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode=()=> {
        setEditMode(false);
        props.onChange(title)
    }


    const onChangeInputTitle=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={onChangeInputTitle}
                 onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}