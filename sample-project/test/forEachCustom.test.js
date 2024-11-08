import { forEachCustom } from '../index.js';
import assert from 'assert';

let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});

it('Should sum array', () => {
  let total = 0;
  forEachCustom(numbers, (value) => (total += value));

  assert.strictEqual(total, 6);
});

it('beforeEach is ran each time', () => {
  assert.strictEqual(numbers.length, 4);
});
