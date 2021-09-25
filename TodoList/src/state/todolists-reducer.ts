import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";


const initialState:Array<TodolistType> = [ ]


export const todolistsReducer = (state: Array<TodolistType>= initialState, action: AllActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
                }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.newTitle

            }
            return [...state]
            }
        case'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(t => t.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;

            }
            return [...state]
        }
        default :
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    } as const
}
export const changeTodolistTitleAC = (newTitle: string,id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        newTitle: newTitle,
        id: id
    } as const
}
export const changeTodolistFilterAC = (id: string,filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: id,
        value: filter
    } as const
}

export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type AllActionType =  removeTodolistType | AddTodolistType |ChangeTodolistType |ChangeTodolistFilterType