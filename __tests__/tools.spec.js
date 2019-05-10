/**
 * @description - tools unit tests
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { createPrefetchTags, createPreloadTags } from '../src/tools';

// scope
const algorithm = jest
  .fn()
  .mockReturnValue({ as: 'font', crossorigin: 'anonymous' });

describe('tools suits', () => {
  it('should create prefetch tag', () => {
    expect(createPrefetchTags('/hello.jpg')).toMatchSnapshot();
  });

  it('should create preload tag', () => {
    expect(createPreloadTags('/iconfont.woff2', algorithm)).toMatchSnapshot();
  });
});
