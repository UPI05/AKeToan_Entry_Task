import * as constants from '../../backend/common/constants';
import app from '../../backend/server';

const request = require('supertest');

export default function testEditItemApi(token, id, newTitle) {
  describe('edit item', () => {
    it('without sending a token', async () => {
      const res = await request(app)
        .put('/api/v1/items/edit')
        .send({
          id,
          newTitle,
        });
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(401);
      expect(data.message).toEqual(constants.RES_MSG_TOKEN_NOT_FOUND);
    });

    it('with sending a token', async () => {
      const res = await request(app)
        .put('/api/v1/items/edit')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id,
          newTitle,
        });
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(200);
      expect(data.message).toEqual(constants.RES_MSG_EDIT_ITEM_SUCCESS);
    });
  });
}
