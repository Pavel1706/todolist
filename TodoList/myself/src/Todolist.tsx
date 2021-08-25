import React from 'react';
import {TypeButton} from "./App";

export type propsType={
    title:string
    tasks:Array<tasksType>
    removeTask: (id:number)=> void
    sort: (arg:TypeButton)=> void
}

type tasksType = {
    id: number
    title: string
    isDone: boolean

}

export const Todolist=(props: propsType)=>{


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t=> <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={()=>{props.removeTask(t.id)}}>x</button>
                </li>)}

            </ul>
            <div>
                <button onClick={()=>{props.sort('All')}} >All</button>
                <button onClick={()=>{props.sort('Active')}}>Active</button>
                <button onClick={()=>{props.sort('Completed')}}>Completed</button>
            </div>
        </div>
    )

}

