import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TypeButton = 'All' | 'Completed' | 'Active'


function App() {

    const [tasks, setState] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'HTML', isDone: false},
        {id: 4, title: 'React', isDone: true},
        {id: 5, title: 'Redux', isDone: false},
    ]);

    let [progress, sort] = useState<'All' | 'Completed' | 'Active'>('All')
    let newTask = tasks
    if (progress === 'Completed') {
        newTask = tasks.filter(t => t.isDone === true)
    }

    if (progress === 'Active') {
        newTask = tasks.filter(t => t.isDone === false)
    }


    function removeTask(id: number) {
        let filter = tasks.filter(t => t.id !== id)
        setState(filter)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={newTask}
                      removeTask={removeTask}
                      sort={sort}
            />

        </div>
    );
}

export default App;
