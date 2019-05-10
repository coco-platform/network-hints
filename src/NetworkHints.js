/**
 * @description - webpack plugin for inject network hints
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { resolve } from 'url';
import { match } from 'minimatch';
import { createPrefetchTags, createPreloadTags } from './tools';
import preloadAttrAlgorithm from './preload';

// scope
const defaultOptions = {
  prefetch: [],
  preload: [],
};

class NetworkHints {
  constructor(options) {
    this.options = { ...defaultOptions, ...options };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('NetworkHints', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        'NetworkHints',
        (html, callback) => {
          const { publicPath } = compiler.options.output;
          const assets = Reflect.ownKeys(compilation.assets);
          const prefetch = this.options.prefetch
            .reduce(
              (acc, pattern) => [
                ...acc,
                ...match(assets, pattern, { matchBase: true }),
              ],
              []
            )
            .map((asset) => resolve(publicPath, asset))
            .map((asset) => createPrefetchTags(asset));
          const preload = this.options.preload
            .reduce(
              (acc, pattern) => [
                ...acc,
                ...match(assets, pattern, { matchBase: true }),
              ],
              []
            )
            .map((asset) => resolve(publicPath, asset))
            .map((asset) => createPreloadTags(asset, preloadAttrAlgorithm));

          const payload = {
            ...html,
            head: [...html.head, ...prefetch, ...preload],
          };

          callback(null, payload);
        }
      );
    });
  }
}

export default NetworkHints;
