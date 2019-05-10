/**
 * @description - tools unit tests
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import preload from '../src/preload';

describe('tools suits', () => {
  it('should preload scripts', () => {
    expect(preload('jest.chunk.js')).toMatchSnapshot();
  });

  it('should preload stylesheets', () => {
    expect(preload('jest.chunk.css')).toMatchSnapshot();
  });

  it('should preload fonts', () => {
    expect(preload('jest.chunk.woff2')).toMatchSnapshot();
  });

  it('should preload images', () => {
    expect(preload('jest.chunk.jpg')).toMatchSnapshot();
  });
  it('should preload document', () => {
    expect(preload('jest.chunk.html')).toMatchSnapshot();
  });
});
