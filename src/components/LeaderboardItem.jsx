import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow-sm">
      <div className="flex items-center gap-2">
        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
        <p className="font-semibold text-sm">{user.name}</p>
      </div>
      <p className="font-bold text-blue-600">{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;