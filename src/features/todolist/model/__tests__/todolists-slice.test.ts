// import { beforeEach, expect, test } from 'vitest'
// import {
//     changeFilter,
//     changeTodolistTitle,
//     createTodolist,
//     deleteTodolist,
//     DomainTodolist,
//     todolistsReducer,
// } from '../todolists-slice'
// import { nanoid } from '@reduxjs/toolkit'

// // 1. Стартовый state
// const todolistId1 = nanoid()
// const todolistId2 = nanoid()
// let startState: DomainTodolist[] = []
// beforeEach(() => {
//     startState = [
//         { id: todolistId1, title: 'What to learn', filter: 'all' },
//         { id: todolistId2, title: 'What to buy', filter: 'all' },
//     ]
// })

// test('correct todolist should be deleted', () => {
//     // 2. Действие
//     const action = deleteTodolist({ todolistId: todolistId1 })
//     const endState = todolistsReducer(startState, action)

//     // 3. Проверка, что действие измененило state соответствующим образом
//     // в массиве останется один тудулист
//     expect(endState.length).toBe(1)
//     // удалится нужный тудулист, не любой
//     expect(endState[0].id).toBe(todolistId2)
// })

// test('correct todolist should be created', () => {
//     //2. Действие
//     const newTodotitle = 'New Todolist'
//     const endState = todolistsReducer(
//         startState,
//         createTodolist(newTodotitle),
//     )

//     // 3. Проверка, что действие измененило state соответствующим образом
//     expect(endState.length).toBe(3)
//     expect(endState[2].title).toBe(newTodotitle)
// })

// test('correct todolist should change its title', () => {
//     // 2. Действие
//     const newTodotitle = 'New Todolist'
//     const endState = todolistsReducer(
//         startState,
//         changeTodolistTitle({
//             todolistId: todolistId2,
//             title: 'New Todolist',
//         }),
//     )

//     // 3. Проверка, что действие измененило state соответствующим образом
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTodotitle)
// })

// test('correct filter of todolist should be changed', () => {
//     // 2. Действие
//     const newFilter = 'completed'
//     const endState = todolistsReducer(
//         startState,
//         changeFilter({ todolistId: todolistId2, filter: 'completed' }),
//     )

//     // 3. Проверка, что действие измененило state соответствующим образом
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })

import { beforeEach, expect, test } from 'vitest';
import {
    changeFilter,
    changeTodolistTitle,
    createTodolist,
    deleteTodolist,
    DomainTodolist,
    todolistsReducer,
} from '../todolists-slice';
import { nanoid } from '@reduxjs/toolkit';

// 1. Стартовый state
const todolistId1 = nanoid();
const todolistId2 = nanoid();
let startState: DomainTodolist[] = [];

beforeEach(() => {
    startState = [
        { id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all' },
        { id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all' },
    ];
});

test('correct todolist should be deleted', () => {
    const action = deleteTodolist.fulfilled(
        { todolistId: todolistId1 }, // payload
        'requestId', // requestId
        { todolistId: todolistId1 } // аргументы, переданные в deleteTodolist
    );

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be created', () => {
    const newTodotitle = 'New Todolist';
    const action = createTodolist.fulfilled(
        { todolistId: 'newTodolistId', title: newTodotitle }, // payload
        'requestId', // requestId
        { title: newTodotitle } // аргументы, переданные в createTodolist
    );

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodotitle);
});

test('correct todolist should change its title', () => {
    const newTodotitle = 'New Todolist';
    const action = changeTodolistTitle.fulfilled(
        { todolistId: todolistId2, title: newTodotitle }, // payload
        'requestId', // requestId
        { todolistId: todolistId2, title: newTodotitle } // аргументы, переданные в changeTodolistTitle
    );

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodotitle);
});

test('correct filter of todolist should be changed', () => {
    const newFilter = 'completed';
    const action = changeFilter({ todolistId: todolistId2, filter: newFilter });

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});