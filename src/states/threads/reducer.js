import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_VOTE_THREAD:
      const { threadId, userId, voteType } = action.payload;
      return threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: voteType === 1 
                ? [...thread.upVotesBy, userId] // Add user
                : thread.upVotesBy.filter((id) => id !== userId), // Remove user
            downVotesBy: voteType === -1
                ? [...thread.downVotesBy, userId]
                : thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;