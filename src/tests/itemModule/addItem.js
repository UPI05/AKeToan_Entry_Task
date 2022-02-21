import * as constants from '../../backend/common/constants';
import app from '../../backend/server';

const request = require('supertest');

export default function testAddItemApi() {
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
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjYjZiZTUxZWZlYTZhNDE5ZWM5MzI1ZmVhYTFlYzQ2NjBmNWIzN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAzNzM0OTE0NDkyNDA4NDIzOTc2IiwiaGQiOiJnbS51aXQuZWR1LnZuIiwiZW1haWwiOiIyMTUyMDIzN0BnbS51aXQuZWR1LnZuIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ0eUoyM0VFZlpZUXRqSzdQa05UZGp3IiwibmFtZSI6Ikhp4bq_dSBWw7UgVHLGsOG7nW5nIFRydW5nIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqdWVDMjVfbE5ramluV0w3MGw5dDFPSWpXXzBCTElIWG5KcDF3MT1zOTYtYyIsImdpdmVuX25hbWUiOiJIaeG6v3UiLCJmYW1pbHlfbmFtZSI6IlbDtSBUcsaw4budbmcgVHJ1bmciLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY0NTQ4NDA0MSwiZXhwIjoxNjQ1NDg3NjQxLCJqdGkiOiJkYzc4NThjMGM2NjhhZTA3M2VmOTgxNDI5YjJiMGE4MTlkOGRkNjFmIn0.fwj3Jsl4Wr_ID8Lu9NHsYTn0EkmFhT6luarbiHE-BjreSFWzEwof3SsXhvjs0jbC4-dU2CoePO48dK0UJc74VLiexYjpVfhqWoQXs1A6ht96chO9rt4rYYPUdpo2rgWooHwwM8nw2hTjHWa937Vlfm87PpSXQpaP5uVrp-iVXcFfMUr8Zrv1MteH7NUnGhSJMPu7ZgSMtZG-F-12fH4cc0o4nxgMuIBusGuze5DU8Mxs8oGatH0evoIufQgYT94jTXETS4pXXbvq1Pc1ErIilS7PPt2mXGjuB7kk2F0tRTCq7ODKhc0GXDct5jmdd64Sw4Hs2zZTbYnVhUG5cutBbA',
        )
        .send({
          title: 'test is cool',
        });
      const data = JSON.parse(res.text);
      expect(data.statusCode).toEqual(200);
      expect(data.message).toEqual(constants.RES_MSG_ADD_ITEM_SUCCESS);
    });
  });
}
