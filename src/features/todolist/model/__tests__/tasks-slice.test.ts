import { beforeEach, expect, test } from 'vitest'
import {
    createTask,
    deleteTask,
    tasksReducer,
    TasksState,
    updateTask
} from '../tasks-slice'
import { createTodolist, deleteTodolist } from '../todolists-slice'
import { TaskPriority, TaskStatus } from '@/common/enums/enums'

// 1. Стартовый state
let startState: TasksState = {}
beforeEach(() => {
    startState = {
        todolistId1: [
            {
                description: null,
                title: 'CSS',
                completed: true,
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: "",
                id: '1',
                todoListId: "1",
                order: 1,
                addedDate: "",
            },
            {
                description: null,
                title: 'JS',
                completed: true,
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: "",
                id: '2',
                todoListId: "1",
                order: 1,
                addedDate: "",
            },
            {
                description: null,
                title: 'React',
                completed: true,
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: "",
                id: '3',
                todoListId: "1",
                order: 1,
                addedDate: "",
            }
        ],
        todolistId2: [
            {
                description: null,
                title: 'bread',
                completed: true,
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: "",
                id: '1',
                todoListId: "1",
                order: 1,
                addedDate: "",
            },
            {
                description: null,
                title: 'milk',
                completed: true,
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: "",
                id: '2',
                todoListId: "1",
                order: 1,
                addedDate: "",
            },
            {
                description: null,
                title: 'tea',
                completed: true,
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: null,
                deadline: "",
                id: '3',
                todoListId: "1",
                order: 1,
                addedDate: "",
            }
        ],
    }
})

test('correct task should be added to correct array', () => {
    const action = createTask.fulfilled(
        { task: {
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
        } },
        'requestId',
        { todolistId: 'todolistId2', title: 'juce' }
    );

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatus.New);
});

test('correct task should be deleted from correct array', () => {
    const action = deleteTask.fulfilled(
        { todolistId: 'todolistId2', taskId: '2' },
        'requestId',
        { todolistId: 'todolistId2', taskId: '2' }
    );

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].find(t => t.id === '2')).toBeUndefined();
});

test('correct task should change correct status', () => {
    const action = updateTask.fulfilled(
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
    );

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][0].status).toBe(TaskStatus.Completed);
});

test('correct task should change correct title', () => {
    const action = updateTask.fulfilled(
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
    );

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('TS');
});

test('array with empty tasks should be added with new todolist', () => {
    const action = createTodolist.fulfilled(
        { todolistId: 'todolistId3', title: 'new todolist' },
        'requestId',
        { title: 'new todolist' } 
    );

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    expect(keys.length).toBe(3);
    expect(endState['todolistId3']).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = deleteTodolist.fulfilled(
        { todolistId: 'todolistId2' }, 
        'requestId', 
        { todolistId: 'todolistId2' } 
    );

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
    // или
    expect(endState['todolistId2']).toBeUndefined();
});