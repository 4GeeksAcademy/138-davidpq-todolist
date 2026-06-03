import { X } from "lucide-react";
import { useState } from "react"

export default function ToDoList() {
    let miStorage = []
    console.log(localStorage.getItem("list"));

    if (localStorage.getItem("list") != null) {
        miStorage = localStorage.getItem("list").split(",");
    } else {
        localStorage.setItem("list", []);
    }
    console.log(miStorage);


    const [list, setList] = useState(miStorage)
    const [value, setValue] = useState("")
    function handleSubmit(e) {
        e.preventDefault()
        if (value.length !== 0) {
            setList([...list, value]);
            localStorage.setItem("list", [...list, value]);
        }
    }
    function handleDelete(index) {
        const result = list.filter((element, indexfilt) => indexfilt !== index);
        setList(result);
        localStorage.setItem("list", result);

    }
    return (
        <div className="todo-card card border-0">
            <div className="card-body p-0">


                <h1 className="todos-header pt-4">todos</h1>


                <div className="px-4 pb-3">
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            className="form-control form-control-lg border-0 shadow-sm py-3"
                            placeholder="What needs to be done?"
                            onChange={(e) => { setValue(e.target.value) }} />
                    </form>
                </div>


                <ul className="list-group list-group-flush">

                    {
                        list.length !== 0 ?
                            (
                                list.map((element, index) => {
                                    return (
                                        <li key={index} className="list-group-item py-3 px-4 d-flex justify-content-between"
                                            onMouseEnter={(e) => { e.target.firstElementChild.classList.remove("d-none") }}
                                            onMouseLeave={(e) => { e.target.firstElementChild.classList.add("d-none") }}>
                                            {element}
                                            <X size={16} color="#C68C8F" className="d-none" onClick={() => { handleDelete(index) }} />
                                        </li>)
                                }))
                            :
                            <li className="list-group-item py-3 px-4 d-flex justify-content-between">No hay tareas, añadir tareas</li>
                    }
                </ul>


                <div className="d-flex justify-content-between px-4 py-3 text-muted small">
                    <span>{list.length} items left</span>
                </div>

            </div>
        </div>
    )
}