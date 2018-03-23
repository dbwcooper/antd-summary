import request from '../utils/request';

export function lifeCycleFetch() {
  return request('https://randomuser.me/api/?results=3');
}