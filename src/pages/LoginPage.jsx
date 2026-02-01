import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import useInput from '../hooks/useInput'; 

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Menggunakan Custom Hook useInput yang baru dibuat
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Forum</h2>
        <form onSubmit={onLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={onEmailChange}
            className="w-full mb-4 p-2 border rounded" 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={onPasswordChange}
            className="w-full mb-6 p-2 border rounded" 
            required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
            Belum punya akun? <Link to="/register" className="text-blue-600">Daftar</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;