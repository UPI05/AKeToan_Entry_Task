import dbConnect from '../backend/models/dbConnect';
import testAddItemApi from './itemModule/addItem';

jest.useFakeTimers();

beforeEach(() => {
  dbConnect();
});

testAddItemApi();
