import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

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

} from "./state/todolists-reducer";

import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)


    function changeFilter(todolistId: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)

    }

    function addItem(Newtitle: string) {
        const action = addTodolistAC(Newtitle)
        dispatch(action)

    }

    function changeNameTodo(newTitle: string, id: string) {
        const action = changeTodolistTitleAC(newTitle, id)
        dispatch(action)
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


                            return <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist
                                        changeNameTodo={changeNameTodo}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
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

export default AppWithRedux;
