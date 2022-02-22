import testAddItemApi from './itemModule/addItem';
import testEditItemApi from './itemModule/editItem';
import testDeleteItemApi from './itemModule/deleteItem';
import testGetAllItemsApi from './itemModule/getAllItems';
import { dbConnect, dbDisconnect } from '../backend/models/testDbConnect';
import { Items } from '../backend/models/itemsModel';

// You need to refresh this token evertime running test
// 'npm run start', login and then go to the local storage to get the new one
const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjYjZiZTUxZWZlYTZhNDE5ZWM5MzI1ZmVhYTFlYzQ2NjBmNWIzN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyMDIyODcwMzk4OTI2ODMyNjczIiwiZW1haWwiOiJpbG9zdG15ZW1haWxoaWV1dkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjZoR1NUZXVYYTdkNVFubG9VSm5PNlEiLCJuYW1lIjoiVi4gSGlldSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5OEFUSGp2VVdlaUI0YUlXUmpFeWVibU1VUFR2dHdXYnZWZ1J3SD1zOTYtYyIsImdpdmVuX25hbWUiOiJWLiIsImZhbWlseV9uYW1lIjoiSGlldSIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjQ1NTEzNTA1LCJleHAiOjE2NDU1MTcxMDUsImp0aSI6Ijk3ZTlmOTRjNjEyODc5NmY3MmZlMjM4Mzk2NTU4ZDllN2M2NDVlN2UifQ.Oqc_Nmw2zBF74GzLQcA0EjFnf04yeeC8LZ1TLT70Q9Jrjyvhf472zeTTeMz_H0njptXfuASfxLQ5fck-4BcXk0Bjs0p5wm_XyZhSAUb8DUpnxGKxpKXcXeDZQ0YSdAwMtDjsnvvMQFcAVp4ZJBxXwRGgcgLHVOWuHJr9zueCuLCgztEaHdJfpTP3MmNDbk-ZQ6BykoMF-dYDLCtWz9rgeTY6n_Sz3djp9amJgeEFzT_jIVfE3kP-tJvJcqHFnmlwcYuS4lgQv6znhsSKpXr7WpYkJpr5t0qwOn7ALVNdNK87VCJFVuyONzja9FQCuqf6deAwHGYNAn_XRPoH66nevw';

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
