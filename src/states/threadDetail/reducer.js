import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
        const { userId, voteType } = action.payload;
        return {
            ...threadDetail,
            upVotesBy: voteType === 1 
                ? [...threadDetail.upVotesBy, userId] 
                : threadDetail.upVotesBy.filter((id) => id !== userId),
            downVotesBy: voteType === -1
                ? [...threadDetail.downVotesBy, userId]
                : threadDetail.downVotesBy.filter((id) => id !== userId),
        };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;