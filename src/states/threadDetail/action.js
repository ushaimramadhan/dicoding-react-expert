import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleVoteThreadDetailActionCreator({ userId, voteType }) {
    return {
        type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
        payload: { userId, voteType },
    };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleVoteThreadDetail(voteType) {
    return async (dispatch, getState) => {
        const { authUser, threadDetail } = getState();
        dispatch(toggleVoteThreadDetailActionCreator({ userId: authUser.id, voteType }));
        try {
             if(voteType === 1) await api.toggleUpVoteThread(threadDetail.id);
             else if(voteType === -1) await api.toggleDownVoteThread(threadDetail.id);
             else await api.toggleNeutralVoteThread(threadDetail.id);
        } catch (error) {
            alert(error.message);
        }
    }
}

function asyncAddComment({ content }) {
    return async (dispatch, getState) => {
        const { threadDetail } = getState();
        try {
            const comment = await api.createComment({ threadId: threadDetail.id, content });
            // Refresh detail thread setelah komen berhasil agar list komentar update
            // Cara lebih efisien adalah append comment ke state lokal reducer, tapi fetch ulang lebih aman untuk data konsistensi
            const newDetail = await api.getThreadDetail(threadDetail.id);
            dispatch(receiveThreadDetailActionCreator(newDetail));
        } catch (error) {
            alert(error.message);
        }
    }
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleVoteThreadDetail,
  asyncAddComment,
};