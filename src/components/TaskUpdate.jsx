// src/components/AddTaskForm.js
import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
const TaskUpdate = () => {
    let {id}=useParams()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    useEffect( () => {
            const fetchDate=async()=>{
            const response = await fetch(`/task/getById/${id}`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setTitle(json.title)
            setDescription(json.description)
            const datePart = json.due_date.split('T')[0];
            setDueDate(datePart)
            setStatus(json.status)
        }
        fetchDate();
    }, [id])
    const navigate = useNavigate()
    const context = useContext(TaskContext)
    const { updateTask } = context
    const handleSubmit = async (event) => {
        event.preventDefault();
        updateTask(id, title, description, dueDate, status)
        setTitle('')
        setDescription('')
        setDueDate('')
        setStatus('')
        navigate("/")
    };

    return (
        <div className='bg-gradient-to-r from-blue-600 to-black w-full h-screen'>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Edit Task
                </button>
            </form>
        </div>
    );
};

export default TaskUpdate;
