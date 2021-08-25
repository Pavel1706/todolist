import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type InputType={
    onNewTitleChangeHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>)=> void
    title:string
}


export function Input(props:InputType){
    return (
    <input value={props.title}
           onChange={props.onNewTitleChangeHandler}
           onKeyPress={props.onKeyPressHandler}/>

    )
}

