import { beforeEach, expect, test } from 'vitest';
import {
    createTask,
    deleteTask,
    tasksReducer,
    TasksState,
    updateTask,
} from '../tasks-slice';
import { createTodolist, deleteTodolist } from '../todolists-slice';
import { TaskPriority, TaskStatus } from '@/common/enums/enums';

// 1. Стартовый state
let startState: TasksState = {};

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: '',
                order: 1,
                addedDate: '',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatus.Completed,
                todoListId: 'todolistId1',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: '',
                order: 1,
                addedDate: '',
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: '',
                order: 1,
                addedDate: '',
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: '',
                order: 1,
                addedDate: '',
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatus.Completed,
                todoListId: 'todolistId2',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: '',
                order: 1,
                addedDate: '',
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: '',
                order: 1,
                addedDate: '',
            },
        ],
    };
});

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(
        startState,
        createTask.fulfilled(
            {
                task: {
                    id: '4',
                    title: 'juce',
                    status: TaskStatus.New,
                    todoListId: 'todolistId2',
                    description: null,
                    completed: false,
                    priority: TaskPriority.Low,
                    startDate: null,
                    deadline: null,
                    order: 1,
                    addedDate: '',
                },
            },
            'requestId',
            { todolistId: 'todolistId2', title: 'juce' }
        )
    );

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatus.New);
});

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(
        startState,
        deleteTask.fulfilled(
            { todolistId: 'todolistId2', taskId: '2' },
            'requestId',
            { todolistId: 'todolistId2', taskId: '2' }
        )
    );

    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].find((t) => t.id === '2')).toBeUndefined();
});

test('correct task should change correct status', () => {
    const endState = tasksReducer(
        startState,
        updateTask.fulfilled(
            {
                id: '1',
                todoListId: 'todolistId1',
                status: TaskStatus.Completed,
                title: 'CSS',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                order: 1,
                addedDate: '',
            },
            'requestId',
            {
                id: '1',
                todoListId: 'todolistId1',
                status: TaskStatus.Completed,
                title: 'CSS',
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                order: 1,
                addedDate: '',
            }
        )
    );

    expect(endState['todolistId1'][0].status).toBe(TaskStatus.Completed);
});

test('correct task should change correct title', () => {
    const endState = tasksReducer(
        startState,
        updateTask.fulfilled(
            {
                id: '2',
                todoListId: 'todolistId1',
                title: 'TS',
                status: TaskStatus.Completed,
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                order: 1,
                addedDate: '',
            },
            'requestId',
            {
                id: '2',
                todoListId: 'todolistId1',
                title: 'TS',
                status: TaskStatus.Completed,
                description: null,
                completed: true,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: null,
                order: 1,
                addedDate: '',
            }
        )
    );

    expect(endState['todolistId1'][1].title).toBe('TS');
});

test('array with empty tasks should be added with new todolist', () => {
    const endState = tasksReducer(
        startState,
        createTodolist.fulfilled(
            { todolistId: 'todolistId3', title: 'new todolist' },
            'requestId',
            { title: 'new todolist' }
        )
    );

    const keys = Object.keys(endState);
    expect(keys.length).toBe(3);
    expect(endState['todolistId3']).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTodolist.fulfilled(
            { todolistId: 'todolistId2' },
            'requestId',
            { todolistId: 'todolistId2' }
        )
    );

    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
    expect(endState['todolistId2']).toBeUndefined();
});