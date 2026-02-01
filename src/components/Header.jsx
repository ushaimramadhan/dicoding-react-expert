import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Header({ authUser }) {
    const dispatch = useDispatch();

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Dicoding Forum</Link>
                <nav>
                    {authUser ? (
                        <div className="flex items-center gap-4">
                            <span>Halo, {authUser.name}</span>
                            <button 
                                onClick={() => dispatch(asyncUnsetAuthUser())}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                            >Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded font-bold">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;