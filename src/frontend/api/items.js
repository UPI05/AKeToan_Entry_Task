import { Delete, get, post, update } from '../utils/fetchUtils';

export function getAllItemsApi() {
  return get('/api/v1/items/getAll');
}

export function addItemApi(body) {
  return post('/api/v1/items/add', body);
}

export function deleteItemApi(id) {
  return Delete(`/api/v1/items/delete/${id}`);
}

export function updateItemApi(body) {
  return update('/api/v1/items/edit', body);
}
