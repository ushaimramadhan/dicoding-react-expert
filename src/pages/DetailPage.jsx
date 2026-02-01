import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveThreadDetail, asyncToggleVoteThreadDetail, asyncAddComment } from '../states/threadDetail/action';
import { postedAt } from '../utils';
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onVote = (voteType) => {
      if(!authUser) return alert("Login dulu!");
      dispatch(asyncToggleVoteThreadDetail(voteType));
  };

  const onCommentSubmit = (e) => {
      e.preventDefault();
      if(!authUser) return alert("Login dulu!");
      dispatch(asyncAddComment({ content: commentContent }));
      setCommentContent('');
  };

  if (!threadDetail) {
    return null; // Loading state bisa handle disini
  }

  const isUpVoted = authUser ? threadDetail.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? threadDetail.downVotesBy.includes(authUser.id) : false;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <span className="text-sm bg-gray-200 px-2 py-1 rounded">#{threadDetail.category}</span>
        <h1 className="text-3xl font-bold my-4">{threadDetail.title}</h1>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />
        
        <div className="flex items-center gap-6 mb-4">
             <button onClick={() => isUpVoted ? onVote(0) : onVote(1)} className="flex items-center gap-2 text-xl">
                 {isUpVoted ? <FaThumbsUp className="text-blue-600"/> : <FaRegThumbsUp />} {threadDetail.upVotesBy.length}
             </button>
             <button onClick={() => isDownVoted ? onVote(0) : onVote(-1)} className="flex items-center gap-2 text-xl">
                 {isDownVoted ? <FaThumbsDown className="text-red-600"/> : <FaRegThumbsDown />} {threadDetail.downVotesBy.length}
             </button>
             <div className="flex items-center gap-2">
                 <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="w-8 h-8 rounded-full" />
                 <div>
                     <p className="text-sm font-bold">{threadDetail.owner.name}</p>
                     <p className="text-xs text-gray-500">{postedAt(threadDetail.createdAt)}</p>
                 </div>
             </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Beri Komentar</h3>
          <form onSubmit={onCommentSubmit} className="mb-8">
              <textarea 
                  className="w-full border p-2 rounded mb-2" 
                  rows="4" 
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Komentar Anda..."
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full">Kirim</button>
          </form>

          <h3 className="text-xl font-bold mb-4">Komentar ({threadDetail.comments.length})</h3>
          {threadDetail.comments.map((comment) => (
              <div key={comment.id} className="border-b py-4">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                          <img src={comment.owner.avatar} alt={comment.owner.name} className="w-8 h-8 rounded-full" />
                          <p className="font-bold">{comment.owner.name}</p>
                      </div>
                      <p className="text-xs text-gray-500">{postedAt(comment.createdAt)}</p>
                  </div>
                  <div dangerouslySetInnerHTML={{__html: comment.content}} className="mb-2 text-gray-700"/>
              </div>
          ))}
      </div>
    </div>
  );
}

export default DetailPage;