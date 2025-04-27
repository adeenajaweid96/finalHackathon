import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]); 

  const handleAddTask = () => {
    if (!title || !description) {
      alert('Please fill in both fields');
      return;
    }
    const newTask = {
      id: Date.now(), 
      title,
      description,
      status: 'Pending',
    };
    setTasks([...tasks, newTask]); 
    setTitle(''); 
    setDescription(''); 
  };

  const handleComplete = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
        <div className='bg-blue-500 p-5 flex justify-between items-center w-full'>
   <h1 className='text-white text-3xl font-semibold'>Task Manager App</h1>
 
   <div className='space-x-4'>
  <Link to='/register'>  <button className='bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-all duration-300'>
            Sign up
    </button>
      </Link> 
      <Link to='/login'><button className='bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all duration-300'>
        Login
      </button></Link>
    </div>
  </div>
    <div className="bg-white p-5 flex justify-between items-center w-full">

   /

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Create New Task</h3>
        <input
          type="text"
          className="w-full p-2 mt-4 border-2 border-gray-300 rounded-md"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mt-4 border-2 border-gray-300 rounded-md"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="w-full py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
        >
          Add Task
        </button>
      </div>

      <div className="mt-8">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-gray-500 mt-2">Status: {task.status}</p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                onClick={() => handleComplete(task.id)}
              >
                Complete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                onClick={() => handleComplete(task.id)}
              >
                Pending
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
