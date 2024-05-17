import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  let history = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("https://task-manager-fxzi.onrender.com/auth/login", {
      method: 'POST',
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({ "username": username, "password": password })
    })
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.token)

      history("/")
    }
    else {
      setError('Invalid Password')
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-600 to-black w-full h-screen'>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-semibold text-white">
              Log in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full mb-2 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Log in
              </button>
              <div className='text-white text-sm m-2 text-center'>
                Don't have an account? <a className='underline cursor-pointer' onClick={() => (
                  history("/signup")
                )}>Create Account</a>
              </div>
            </div>
            {error && <div className='text-red-600 font-bold'>
              !!Invalid Credentials
            </div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
