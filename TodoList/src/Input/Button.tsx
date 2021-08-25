import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type ButtonType={
    onClick: ()=> void
}


export function Button(props: ButtonType){
    return (
    <button onClick={props.onClick}>+</button>
    )
}



