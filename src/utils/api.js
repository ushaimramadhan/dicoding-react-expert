const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: { user } } = responseJson;
    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: { token } } = responseJson;
    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: { user } } = responseJson;
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.threads;
  }

  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.detailThread;
  }

  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.thread;
  }

  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.comment;
  }

  async function toggleUpVoteThread(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
  }

  async function toggleDownVoteThread(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
  }

  async function toggleNeutralVoteThread(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    toggleUpVoteThread,
    toggleDownVoteThread,
    toggleNeutralVoteThread,
    getLeaderboards,
  };
})();

export default api;