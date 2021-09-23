import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";


export const todolistsReducer = (state: Array<TodolistType>, action: AllActionType): Array<TodolistType> => {
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
                todolist.title = action.title

            }
            return [...state]
            }
        case'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;

            }
            return [...state]
        }
        default :
            throw new Error('I didn`t catch it')
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
export const ChangeTodolistAC = (id: string,title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    } as const
}
export const ChangeTodolistFilterAC = (id: string,filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    } as const
}

export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistType = ReturnType<typeof ChangeTodolistAC>
export type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
export type AllActionType =  removeTodolistType | AddTodolistType |ChangeTodolistType |ChangeTodolistFilterType