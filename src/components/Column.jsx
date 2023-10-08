

import classNames from "classnames";
import { useStore } from "../store";
import "./Column.css"
import Task from "./Task"
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';


export default function Column({state}){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state),
    );
    
    const addTask = useStore(store => store.addTask)

    const setDraggedTask = useStore(store => store.setDraggedTask)
    const draggedTask = useStore(store => store.draggedTask)
    const moveTask = useStore(store => store.moveTask)



    return(
        <div className={classNames("column", {drop: drop} )}
        onDragOver={(ev) => {
            ev.preventDefault();
            setDrop(true);
            
        }}
        onDragLeave={(ev) => {
            ev.preventDefault();
            setDrop(false);
        }}

        onDrop={ev => {
                moveTask(draggedTask, state);
                setDraggedTask(null)
                setDrop(false);
            }
        }


        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick = {() => setOpen(true)}>Add</button>
            </div>
            {tasks.map((task)=> (
                <Task title={task.title} key={task.title} />
            ))}



            {open && 
                <div className="Modal">
                    <div className="modalContent">
                        <CloseIcon className="close" onClick={() => setOpen(false)} />                       
                        <p className="input-container">
                            <input type="text"
                            onChange={(ev) => setTitle(ev.target.value) } value={title} 
                            placeholder="Enter task title" 
                            name="text" id="text" 
                            className="input-field" 
                            />
                            <label className="input-label">Title</label>
                        </p>

                        <textarea className="textarea" onChange={(ev) => setBody(ev.target.value) } value={body} placeholder="Adicione um texto para sua tarefa..." />

                        <button onClick = {() => {
                            addTask(title, body , state);
                            setTitle('');
                            setBody('');
                            setOpen(false);
                        }}>
                            <span className="circle1"></span>
                            <span className="circle2"></span>
                            <span className="circle3"></span>
                            <span className="circle4"></span>
                            <span className="circle5"></span>
                            <span className="text">Submit</span>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
    
}