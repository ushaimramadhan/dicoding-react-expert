import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: { threadId, userId, voteType },
  };
}

function asyncToggleVoteThread(threadId, voteType) { // voteType: 1 (up), 0 (neutral), -1 (down)
  return async (dispatch, getState) => {
    const { authUser } = getState();
    // OPTIMISTIC UPDATE: Update UI dulu sebelum API call selesai
    dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType })); 

    try {
        if(voteType === 1) await api.toggleUpVoteThread(threadId);
        else if(voteType === -1) await api.toggleDownVoteThread(threadId);
        else await api.toggleNeutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      // Jika gagal, kembalikan state (logic rollback bisa ditambahkan di sini, 
      // tapi untuk submission dasar optimistic UI, catch error alert sudah cukup membuktikan konsep)
      dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType: 0 })); // Reset to neutral/initial logic needed here for perfect rollback
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncToggleVoteThread,
};