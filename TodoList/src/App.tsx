import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItem} from "./AddItem";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

        let todolistTasks = tasks[todolistId];

        tasks[todolistId] = todolistTasks.filter(t => t.id != id);

        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};

        let todolistTasks = tasks[todolistId];

        tasks[todolistId] = [task, ...todolistTasks];

        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        let todolistTasks = tasks[todolistId];

        let task = todolistTasks.find(t => t.id === id);

        if (task) {
            task.isDone = isDone;

            setTasks({...tasks});
        }
    }

    function changeNameTask(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);

        if (task) {
            task.title = newTitle;

            setTasks({...tasks});
        }
    }

    function changeFilter(todolistId: string,value: FilterValuesType ) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {

        setTodolists(todolists.filter(tl => tl.id !== id));

        delete tasks[id];

        setTasks({...tasks});
    }

    function addItem(Newtitle: string) {
        let newTodolistId = v1()
        let todolist: TodolistType = {id: newTodolistId, title: Newtitle, filter: 'all'};

        setTodolists([todolist, ...todolists])

        setTasks({
            ...tasks,
            [newTodolistId]: []
        });
    }

    function changeNameTodo(newTitle: string, id: string) {
        let todolist = todolists.find(t => t.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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

export default App;
