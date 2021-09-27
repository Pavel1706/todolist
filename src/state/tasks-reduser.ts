import {AddTodolistACType, RemoveTodolistAC, RemoveTodolistACType} from "./todolists-reducer";
import {TaskType} from "../Todolist";
import { v1 } from "uuid";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TasksType = RemoveTasksACType | AddTaskACType
    | ChangeStatusTaskACType | ChangeTitleTaskACType | AddTodolistACType | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: TasksType ) :TasksStateType=> {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK':{
        let stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
        let newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks=[newTask, ...tasks]
                stateCopy[action.todolistId] = newTasks
        return stateCopy;
    }
        case "CHANGE-STATUS-TASK": {
            let stateCopy = {...state}
            const todolistTasks = stateCopy[action.todolistId]
            let task = todolistTasks.find(t=>t.id === action.taskId)
            if(task){
                task.isDone = action.isDone
            }
                return stateCopy
        }
        case 'CHANGE-TITLE-TASK': {
            let stateCopy = {...state}
            let todolistId= stateCopy[action.todolistId]
            let task = todolistId.find(t=> t.id === action.taskId)
            if(task) {
                task.title = action.newTitle
            }

            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy={...state}
            stateCopy[action.todolistId]=[]
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            let stateCopy={...state}

             delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('bye bye')
    }

}


type RemoveTasksACType=ReturnType<typeof RemoveTaskAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeStatusTaskACType = ReturnType<typeof ChangeStatusTaskAC>
type ChangeTitleTaskACType = ReturnType<typeof ChangeTitleTaskAC>


export const RemoveTaskAC =(todolistId:string, taskId:string) =>{
    return{
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskId: taskId
    }as const
}

export const AddTaskAC =(todolistId:string, title:string) =>{
    return{
        type: 'ADD-TASK',
        todolistId: todolistId,
        title: title
    }as const
}
export const ChangeStatusTaskAC =(todolistId:string, isDone:boolean, taskId:string) =>{
    return{
        type: 'CHANGE-STATUS-TASK',
        todolistId: todolistId,
        isDone: isDone,
        taskId: taskId
    }as const
}

export const ChangeTitleTaskAC =(todolistId:string, newTitle:string, taskId:string) =>{
    return{
        type: 'CHANGE-TITLE-TASK',
        todolistId: todolistId,
        newTitle: newTitle,
        taskId: taskId
    }as const
}
