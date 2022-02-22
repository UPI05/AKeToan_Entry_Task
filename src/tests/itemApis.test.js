import testAddItemApi from './itemModule/addItem';
import testEditItemApi from './itemModule/editItem';
import testDeleteItemApi from './itemModule/deleteItem';
import testGetAllItemsApi from './itemModule/getAllItems';
import { dbConnect, dbDisconnect } from '../backend/models/testDbConnect';
import { Items } from '../backend/models/itemsModel';

// You need to refresh this token evertime running test
// 'npm run start', login and then go to the local storage to get the new one
const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjYjZiZTUxZWZlYTZhNDE5ZWM5MzI1ZmVhYTFlYzQ2NjBmNWIzN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyMDIyODcwMzk4OTI2ODMyNjczIiwiZW1haWwiOiJpbG9zdG15ZW1haWxoaWV1dkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZfbkUtQVdzcU5wUG1xREpKNFpxYVEiLCJuYW1lIjoiVi4gSGlldSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5OEFUSGp2VVdlaUI0YUlXUmpFeWVibU1VUFR2dHdXYnZWZ1J3SD1zOTYtYyIsImdpdmVuX25hbWUiOiJWLiIsImZhbWlseV9uYW1lIjoiSGlldSIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjQ1NDk4Nzc2LCJleHAiOjE2NDU1MDIzNzYsImp0aSI6IjdlMDZhMTI1YThhYmFjMDNlZGMwMDIwYjBkZDg1YzNlNWRlMTRiNDkifQ.avtX_3z-Lhoy79-D1n3Xmmm_GPNYKSihA1OKV2hjSQoLRS7H_Aa1ySQ7t3xzVq5K8Iw1Igl6j8RB5Od01Lm8Rb3e_8wnUtpy71z6qMSwbudWC2CIu6so6p86cO7os-fc2CPRi8hj-F7Iq3FS8X4TCURfOZBK-rydX1AAPo1_tpZCF4UwiZz8BdCKigREGJKUmqAulgc3KjiywG3Ylecui0dRVAYDnouQaI-3uOznm2JluOuFoOossy80rEtNfNVWc4RUR-whQB4P19VmJe94KTF1g9fxbey_sAI6_4Uj8Mm23j5klXQydBn5R8MBhjQAVLzsWw5OzhdBiEJM-cXSMw';

const defaulItemId = '62112d06c6694f8653632961';

jest.useFakeTimers();
jest.setTimeout(120000);

beforeEach(async () => {
  // Setup server and Connect to mongoDb
  try {
    await dbConnect();

    // Create default item on DB

    const item = new Items({ _id: defaulItemId, title: 'default item' });
    item.save().then(console.info('Create default item success!'));
  } catch (err) {
    console.info(err.message);
  }
});

testAddItemApi(token);

testGetAllItemsApi(token);

testEditItemApi(token, defaulItemId, 'new title');

testDeleteItemApi(token, defaulItemId);

afterEach(async () => {
  // Stop server and Disconnect to mongoDb
  try {
    await dbDisconnect();
  } catch (err) {
    console.info(err.message);
  }
});
