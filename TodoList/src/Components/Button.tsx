import React from 'react';

type propsType = {
    callBack: (id:string)=> void
    id: string
}

export const Button =(props:propsType) =>{
    return (
        <button onClick={()=>props.callBack(props.id)}>x</button>
    )
}