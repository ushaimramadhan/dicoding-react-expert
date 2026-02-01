import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import Loading from './components/Loading'; // Wrapper LoadingBar
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Header from './components/Header'; // Navbar

function App() {
  const { authUser, isPreload } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        {/* Component LoadingBar dari library react-redux-loading-bar */}
        <Loading /> 
      </div>
      <div className="app-container font-sans bg-gray-50 min-h-screen">
        <Header authUser={authUser} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            {/* Tambahkan rute LeaderboardPage jika ingin halaman terpisah */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;