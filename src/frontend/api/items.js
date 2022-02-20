import { get, post } from '../utils/fetchUtils';

export function getAllItemsApi() {
  return get('/api/v1/items/getAll');
}

export function addItemApi(body) {
  return post('/api/v1/items/add', body);
}
