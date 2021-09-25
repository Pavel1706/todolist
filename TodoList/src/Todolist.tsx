import {Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import { AddItem } from './AddItem';
import {FilterValuesType} from './App';
import { ChangeInput } from './ChangeInput';
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";
import {useDispatch, useSelector } from 'react-redux';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (todolistId: string,value: FilterValuesType ) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeNameTodo: (newTitle:string, id:string)=> void
}

export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();



    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter(props.id,"all" );
    const onActiveClickHandler = () => props.changeFilter(props.id,"active") ;
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed") ;

    function TodoName(newTitle:string){
        props.changeNameTodo(newTitle,props.id)
    }
    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return <div>
        <h3> <ChangeInput title={props.title} onChange={TodoName}/>
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItem addItem={(title)=> {dispatch(addTaskAC(title, props.id))}}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }

                    function changename(newTitle:string){
                        dispatch(changeTaskNameAC(t.id, newTitle, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  onChange={onChangeHandler} checked={t.isDone}/>
                       <ChangeInput title={t.title} onChange={changename}/>

                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

