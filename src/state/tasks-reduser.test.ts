import { v1 } from "uuid";
import {
    AddTaskAC,
    ChangeStatusTaskAC,
    ChangeTitleTaskAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reduser";
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";


test('remove task', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startTask, RemoveTaskAC('todolistId1','1'))



    expect(endState['todolistId1'].length).toBe(1);

})

test('add task', ()=> {


const startTask:TasksStateType  = {
    'todolistId1': [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ],
    'todolistId2': [
        {id: '1', title: "Milk", isDone: true},
        {id: '2', title: "React Book", isDone: true}
    ]
}
const endState = tasksReducer(startTask, AddTaskAC('todolistId2','hello'))



expect(endState['todolistId1'].length).toBe(2);
expect(endState['todolistId2'].length).toBe(3);
expect(endState['todolistId2'][0].title).toBe('hello');
})

test('change status task', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startTask, ChangeStatusTaskAC('todolistId2',false, '1'))



    expect(endState['todolistId2'][0].isDone).toBe(false);
    expect(endState['todolistId1'][0].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(true);

})

test('change title task', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startTask, ChangeTitleTaskAC('todolistId2','congratulation', '1'))



    expect(endState['todolistId2'][0].title).toBe('congratulation');
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'][0].title).toBe('congratulation');
    expect(endState['todolistId2'][1].title).toBe("React Book");
    expect(endState['todolistId1'][0].title).toBe("HTML&CSS");


})

test('new property with new array should be added when new todolist is added', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }


    const endState = tasksReducer(startTask, AddTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find ( t=> t !== 'todolistId1' && t !== 'todolistId2')
    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', ()=> {

        const startTask:TasksStateType  = {
            'todolistId1': [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true}
            ],
            'todolistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "React Book", isDone: true}
            ]
        }

    const action = RemoveTodolistAC('todolistId1')


    const endState = tasksReducer(startTask, action)

    const keys = Object.keys(endState);

        expect(keys.length).toBe(1)
    expect(endState['todolistId1']).not.toBeDefined();
    expect(endState['todolistId1']).toBeUndefined();


})
