/**
 * @description - calculate preload link attributes
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { extname } from 'path';
import { lookup } from 'mime-types';

// scope
const scripts = ['.js', '.mjs'];
const stylesheets = ['.css'];
const fonts = ['.woff', '.woff2', '.ttf', '.eot'];
const images = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const documents = ['.html'];

/**
 * @description - compose specific attrs for specific files
 *
 * @param {string} asset
 */
function preloadSpecificAttrs(asset) {
  const extension = extname(asset);

  switch (true) {
    case scripts.includes(extension):
      return { as: 'script' };
    case stylesheets.includes(extension):
      return { as: 'stylesheet', onload: `this.rel='stylesheet'` };
    case fonts.includes(extension):
      return { as: 'font', crossorigin: 'anonymous' };
    case images.includes(extension):
      return { as: 'image' };
    case documents.includes(extension):
      return { as: 'document' };
    default:
      return {};
  }
}

/**
 * @param {string} asset
 *
 * @return {object}
 */
export default function preload(asset) {
  const attrs = {
    rel: 'preload',
    href: asset,
    type: lookup(asset),
  };
  const specifics = preloadSpecificAttrs(asset);

  return { ...attrs, ...specifics };
}
