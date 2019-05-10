/**
 * @description - tool method
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/prefer-default-export */

/**
 * @description - create prefetch tags
 *
 * @param {string} asset
 */
export function createPrefetchTags(asset) {
  return {
    tagName: 'link',
    selfClosingTag: false,
    voidTag: true,
    attributes: {
      rel: 'prefetch',
      href: asset,
    },
  };
}

/**
 * @description - create preload tags
 *
 * @param {string} asset
 * @param {function} algorithm - calculate preload additional attributes
 */
export function createPreloadTags(asset, algorithm) {
  return {
    tagName: 'link',
    selfClosingTag: false,
    voidTag: true,
    attributes: algorithm(asset),
  };
}
