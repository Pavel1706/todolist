import React  from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItem} from "./AddItem";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {useReducer} from 'react';
import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title,todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id,isDone,todolistId)
        dispatchToTasksReducer(action)
    }

    function changeNameTask(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskNameAC(id,newTitle,todolistId);
        dispatchToTasksReducer(action)
    }

    function changeFilter( todolistId: string,value: FilterValuesType) {
        const action = changeTodolistFilterAC(todolistId,value)
        dispatchToTodolistsReducer(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    function addItem(Newtitle: string) {
        const action = addTodolistAC(Newtitle)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    function changeNameTodo(newTitle: string, id: string) {
      const action = changeTodolistTitleAC(newTitle,id)
        dispatchToTodolistsReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItem addItem={addItem}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist
                                        changeNameTodo={changeNameTodo}
                                        // changeNameTask={changeNameTask}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={tasksForTodolist}
                                        // removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        // addTask={addTask}
                                        // changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
