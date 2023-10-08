import { create } from "zustand"
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

const store = (set) => ({
    tasks: [],
    draggedTask:null,
    addTask: (title, body, state) => 
        set((store) => ({ tasks: [...store.tasks, {title, body ,state}] }), false, 'addTask'),
    deleteTask: (title) => 
        set((store) => ({ tasks: store.tasks.filter((task) => task.title !== title) })),
    editTask: (title, newTitle, newBody, newState) =>
        set((store) => ({
            tasks: store.tasks.map((task) =>
                task,title === title ? {...task, title: newTitle, body: newBody, state: newState} : task
            ),
        })),
    setDraggedTask: (title) => set({draggedTask: title}),
    moveTask: (title, state) => 
    set((store) => ({
        tasks: store.tasks.map((task) => 
            task.title === title ? {title, state} : task
            )
    }))
    
});

const log = (config) => (set,get, api) => 
    config (
        (...args) => {
            console.log(args);
            set(...args);
        },
        get,
        api
)


export const useStore = create(
    subscribeWithSelector(log(persist(devtools(store), { name: 'store' })))
  );