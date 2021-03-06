import { HEROKU_URL } from '../constants';
import {
  Endpoint,
  ITask,
  DataTypes,
  IUser,
  ICheckSession,
  UserRole,
  IReviewRequest,
  IReview,
  IDispute,
  CrossCheckSessionState,
} from 'src/models';

export const getUsers = async () => {
  const res = await getData(Endpoint.users);
  return res;
};

export const addUser = async (user: IUser) => {
  const res = await addData(Endpoint.users, user);
  return res;
};

export const setUserRoles = (userId: string, roles: UserRole[]) => {
  fetch(`${HEROKU_URL}users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ roles }),
  });
};

export const getTasks = async () => {
  const res = await getData(Endpoint.tasks);
  return res;
};

export const addTask = async (task: ITask) => {
  const res = await addData(Endpoint.tasks, task);
  return res;
};

export const deleteTask = async (taskId: string) => {
  const res = deleteData(Endpoint.tasks, taskId);
  return res;
};

export const updateTask = async (id: string, data: ITask) => {
  fetch(`${HEROKU_URL}${Endpoint.tasks}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const getCheckSessions = async () => {
  const res = await getData(Endpoint.checkSessions);
  return res;
};

export const getCheckSessionsByState = async (type: CrossCheckSessionState) => {
  let sortedSessions: ICheckSession[] = await getCheckSessions();
  return sortedSessions.filter((item) => item.state === type);
};

export const addCheckSession = async (checkSession: ICheckSession) => {
  const res = await addData(Endpoint.checkSessions, checkSession);
  return res;
};

export const deleteCheckSession = async (sessionId: string) => {
  const res = deleteData(Endpoint.checkSessions, sessionId);
  return res;
};

export const updateCheckSession = async (data: ICheckSession, sessionId: string) => {
  await fetch(`${HEROKU_URL}checkSessions/${sessionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const getReviewRequests = async () => {
  const res = await getData(Endpoint.reviewRequests);
  return res;
};

export const addReviewRequest = async (reviewRequest: IReviewRequest) => {
  const res = await addData(Endpoint.reviewRequests, reviewRequest);
  return res;
};

export const deleteReviewRequest = async (id: string) => {
  const res = await deleteData(Endpoint.reviewRequests, id);
  return res;
};

export const getReviews = async () => {
  const res = await getData(Endpoint.reviews);
  return res;
};

export const addReview = async (review: IReview) => {
  const res = await addData(Endpoint.reviews, review);
  return res;
};

export const updateReview = (data: IReview) => {
  fetch(`${HEROKU_URL}${Endpoint.reviews}/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const getDispute = async () => {
  const res = await getData(Endpoint.disputes);
  return res;
};

export const addDispute = async (dispute: IDispute) => {
  const res = await addData(Endpoint.disputes, dispute);
  return res;
};

export const deleteDispute = async (id: string) => {
  const res = await deleteData(Endpoint.disputes, id);
  return res;
};

export const updateReviewRequest = (data: IReviewRequest, id: string) => {
  fetch(`${HEROKU_URL}${Endpoint.reviewRequests}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const getData = async (endpoint: Endpoint) => {
  const res = await fetch(HEROKU_URL + endpoint, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    },
  });
  if (res.status === 200) {
    return res.json();
  }
  throw Error(`error fetching ${endpoint}`);
};

export const addData = async (endpoint: Endpoint, data: DataTypes) => {
  const res = await fetch(HEROKU_URL + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status === 200 || 204) {
    return res.json();
  }
  throw Error(`error fetching ${endpoint}`);
};

export const deleteData = async (endpoint: Endpoint, id: string) => {
  const res = await fetch(HEROKU_URL + endpoint + '/' + id, {
    method: 'DELETE',
  });
  return res.json();
};

export const registerUser = async (githubLogin: string, users: IUser[], role?: UserRole) => {
  const lastIdNumber = users.length
    ? +users.reduce((maxId, user) => {
        const userId = user.id.includes('user-') ? +user.id.split('user-')[1] : 0;
        return userId > maxId ? userId : maxId;
      }, 0)
    : 0;
  const user = {
    id: `user-${lastIdNumber + 1}`,
    githubId: githubLogin,
    roles: [role || UserRole.student],
  };
  addUser(user);
  return user;
};
