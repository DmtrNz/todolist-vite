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
        { id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle' },
        { id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle' },
    ];
});

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(
        startState,
        deleteTodolist.fulfilled(
            { todolistId: todolistId1 }, // payload
            'requestId', // requestId
            { todolistId: todolistId1 } // аргументы, переданные в deleteTodolist
        )
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be created', () => {
    const newTodotitle = 'New Todolist';
    const endState = todolistsReducer(
        startState,
        createTodolist.fulfilled(
            //{ todolistId: 'newTodolistId', title: newTodotitle }, // payload
            { todolist: { id: 'newTodolistId', title: newTodotitle, addedDate: '', order: 0 } }, // payload
            'requestId', // requestId
            { title: newTodotitle } // аргументы, переданные в createTodolist
        )
    );

    expect(endState.length).toBe(3);
    //expect(endState[2].title).toBe(newTodotitle);
    expect(endState[0].title).toBe(newTodotitle);
});

test('correct todolist should change its title', () => {
    const newTodotitle = 'New Todolist';
    const endState = todolistsReducer(
        startState,
        changeTodolistTitle.fulfilled(
            { todolistId: todolistId2, title: newTodotitle }, // payload
            'requestId', // requestId
            { todolistId: todolistId2, title: newTodotitle } // аргументы, переданные в changeTodolistTitle
        )
    );

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodotitle);
});

test('correct filter of todolist should be changed', () => {
    const newFilter = 'completed';
    const endState = todolistsReducer(
        startState,
        changeFilter({ todolistId: todolistId2, filter: newFilter })
    );

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});