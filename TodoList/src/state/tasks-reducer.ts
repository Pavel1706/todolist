import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistType, removeTodolistType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: AllTasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id != action.id);

            return {...state}
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false};

            let todolistTasks = state[action.todolistId];

            state[action.todolistId] = [task, ...todolistTasks,]

            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];

            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);

            if (task) {
                task.title = action.newTitle;

            }
            return {...state}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id: taskId,
        todolistId: todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: id,
        isDone: isDone,
        todolistId: todolistId
    } as const
}
export const changeTaskNameAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id: id,
        newTitle: newTitle,
        todolistId: todolistId
    } as const
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskNameType = ReturnType<typeof changeTaskNameAC>

type AllTasksReducerType = RemoveTaskType | AddTaskType
    | ChangeTaskStatusType | ChangeTaskNameType | AddTodolistType
    | removeTodolistType