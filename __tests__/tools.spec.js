/**
 * @description - tools unit tests
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { createPrefetchTags } from '../src/tools';

describe('tools suits', () => {
  it('should create prefetch tag', () => {
    expect(createPrefetchTags('/hello.jpg')).toMatchSnapshot();
  });
});
