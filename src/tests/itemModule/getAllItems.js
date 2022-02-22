import * as constants from '../../backend/common/constants';
import app from '../../backend/server';

const request = require('supertest');

export default function testGetAllItemsApi(token) {
  describe('get all items', () => {
    it('without sending a token', async () => {
      const res = await request(app).get('/api/v1/items/getAll');
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(401);
      expect(data.message).toEqual(constants.RES_MSG_TOKEN_NOT_FOUND);
    });
    it('with sending a token', async () => {
      const res = await request(app)
        .get('/api/v1/items/getAll')
        .set('Authorization', `Bearer ${token}`);
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(200);
      expect(data.message).toEqual(constants.RES_MSG_GET_ITEMS_SUCCESS);
    });
  });
}
