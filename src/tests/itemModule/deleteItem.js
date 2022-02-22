import * as constants from '../../backend/common/constants';
import app from '../../backend/server';

const request = require('supertest');

export default function testDeleteItemApi(token, id) {
  describe('delete item', () => {
    it('without sending a token', async () => {
      const res = await request(app).delete(`/api/v1/items/delete/${id}`);
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(401);
      expect(data.message).toEqual(constants.RES_MSG_TOKEN_NOT_FOUND);
    });

    it('with sending a token', async () => {
      const res = await request(app)
        .delete(`/api/v1/items/delete/${id}`)
        .set('Authorization', `Bearer ${token}`);
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(200);
      expect(data.message).toEqual(constants.RES_MSG_DELETE_ITEM_SUCCESS);
    });
  });
}
