//import {sum, filterImageFromURL, deleteLocalFiles} from './util/util.js';

const sum = require('./util');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});