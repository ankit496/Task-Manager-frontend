// src/components/Card.js
import React from 'react';
import { useContext } from 'react';
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import TaskContext from '../context/TaskContext';
import TaskUpdate from './TaskUpdate';
import { useNavigate } from 'react-router-dom';
const TaskCard = ({ title, description, dueDate, status,id }) => {
  const context=useContext(TaskContext)
  const {deleteTask}=context

  const navigate=useNavigate()
  return (
    <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-600">Due: {new Date(dueDate).toLocaleDateString()}</p>
        <p className={`text-sm ${status === 'Done' ? 'text-green-500' : status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
          Status: {status}
        </p>
      </div>
      <div className='flex justify-between'>
        <MdDelete className='text-2xl text-left ml-2 cursor-pointer' onClick={()=>(
          deleteTask(id)
        )}/>
        <MdOutlineEdit className='text-2xl text-right mr-2 cursor-pointer' onClick={()=>(
          navigate(`/edittask/${id}`)
        )}/>
      </div>
      <div>
      </div>
    </div>
    </>
  );
};

export default TaskCard;
