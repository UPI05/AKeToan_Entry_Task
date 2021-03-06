import * as constants from '../../backend/common/constants';
import app from '../../backend/server';

const request = require('supertest');

export default function testAddItemApi(token) {
  describe('add new item', () => {
    it('without sending a token', async () => {
      const res = await request(app)
        .post('/api/v1/items/add')
        .send({
          title: 'test is cool',
        });
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(401);
      expect(data.message).toEqual(constants.RES_MSG_TOKEN_NOT_FOUND);
    });

    it('with sending a token', async () => {
      const res = await request(app)
        .post('/api/v1/items/add')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'test is cool',
        });
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(200);
      expect(data.message).toEqual(constants.RES_MSG_ADD_ITEM_SUCCESS);
    });
  });
}
