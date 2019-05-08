/**
 * @description - suits example
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { sum } from '../src';

describe('standard suits', () => {
  it('standard case', () => {
    expect(sum(1, 2, 3)).toEqual(6);
  });
});
