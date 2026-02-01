import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown, FaComment } from 'react-icons/fa';
import { postedAt } from '../utils';
import { useNavigate } from 'react-router-dom';

function ThreadItem({ id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, user, authUser, onVote }) {
  const navigate = useNavigate();
  const isUpVoted = authUser ? upVotesBy.includes(authUser) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser) : false;

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) return alert("Login dulu bro");
    // Jika sudah di-upvote, netral. Jika belum, upvote.
    isUpVoted ? onVote(id, 0) : onVote(id, 1);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) return alert("Login dulu bro");
    isDownVoted ? onVote(id, 0) : onVote(id, -1);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <div className="border-b border-gray-300 p-4 hover:bg-gray-50 cursor-pointer" onClick={onThreadClick}>
      <span className="border border-gray-400 rounded px-2 py-1 text-xs font-semibold">#{category}</span>
      <h3 className="text-lg font-bold mt-2 text-blue-700">{title}</h3>
      <div className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: body }} />
      
      <div className="flex items-center gap-4 mt-4 text-gray-500">
        <button className={`flex items-center gap-1 ${isUpVoted ? 'text-red-500' : ''}`} onClick={onUpVoteClick}>
          {isUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />} {upVotesBy.length}
        </button>
        <button className={`flex items-center gap-1 ${isDownVoted ? 'text-red-500' : ''}`} onClick={onDownVoteClick}>
          {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />} {downVotesBy.length}
        </button>
        <div className="flex items-center gap-1">
          <FaComment /> {totalComments}
        </div>
        <span className="text-xs">{postedAt(createdAt)}</span>
        <span className="text-xs">by {user.name}</span>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  // Tambahkan PropTypes sesuai data (id, title, dll wajib)
  onVote: PropTypes.func.isRequired,
};

export default ThreadItem;