import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import ThreadItem from '../components/ThreadItem';
import Leaderboards from '../components/Leaderboards'; // Buat komponen ini terpisah jika mau skor tinggi

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onVote = (id, voteType) => {
    dispatch(asyncToggleVoteThread(id, voteType));
  };

  // 1. Ambil list semua kategori unik
  const categories = new Set(threads.map((thread) => thread.category));
  const categoryList = Array.from(categories);

  // 2. Filter thread berdasarkan kategori yg dipilih
  const threadList = threads.filter((thread) => {
      return categoryFilter ? thread.category === categoryFilter : true;
  }).map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser ? authUser.id : null,
  }));

  return (
    <div className="container mx-auto p-4 flex gap-8">
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-4">Diskusi Tersedia</h2>
        
        {/* KATEGORI BUTTONS (5 Star Requirement) */}
        <div className="flex gap-2 mb-4">
            {categoryList.map((category) => (
                <button 
                    key={category}
                    onClick={() => setCategoryFilter(category === categoryFilter ? '' : category)}
                    className={`px-3 py-1 rounded border ${categoryFilter === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                >
                    #{category}
                </button>
            ))}
        </div>

        <div className="flex flex-col gap-4">
          {threadList.map((thread) => (
            <ThreadItem key={thread.id} {...thread} onVote={onVote} />
          ))}
        </div>
      </div>
      
      <div className="w-1/4">
          {/* LEADERBOARD WIDGET BISA DISINI */}
          <h3 className="text-xl font-bold">Klasemen</h3>
          {/* Render Leaderboard Component Here */}
      </div>
    </div>
  );
}

export default HomePage;