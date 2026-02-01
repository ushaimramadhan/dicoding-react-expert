import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onRegister = (event) => {
    event.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
        <form onSubmit={onRegister}>
            <input 
            type="text" placeholder="Nama" value={name} onChange={(e)=>setName(e.target.value)}
            className="w-full mb-4 p-2 border rounded" required
          />
          <input 
            type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded" required
          />
          <input 
            type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full mb-6 p-2 border rounded" required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">
            Sudah punya akun? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;