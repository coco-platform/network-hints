/**
 * @description - webpack plugin for inject network hints
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { resolve } from 'url';
import { match } from 'minimatch';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// internal
import RequireHtmlWebpackPluginError from './exceptions/RequireHtmlWebpackPluginError';
import UnsupportHtmlWebpackPluginVersionError from './exceptions/UnsupportHtmlWebpackPluginVersionError';
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
    compiler.hooks.compilation.tap(
      'WebpackPluginNetworkHints',
      (compilation) => {
        const [HtmlWebpackPluginInstance] = compiler.options.plugins.filter(
          (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
        );

        if (!HtmlWebpackPluginInstance) {
          compilation.errors.push(new RequireHtmlWebpackPluginError());
        }
        // pre-v4 HtmlWebpackPlugin
        else if (
          Reflect.has(compilation.hooks, 'htmlWebpackPluginAlterAssetTags')
        ) {
          compilation.errors.push(new UnsupportHtmlWebpackPluginVersionError());
        } else {
          // get available hooks directly
          const hooks = HtmlWebpackPlugin.getHooks(compilation);

          hooks.alterAssetTagGroups.tapAsync(
            'InjectExternalPlugin',
            (assetTagGroups, callback) => {
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
                .sort()
                .map((asset) => resolve(publicPath, asset))
                .map((asset) =>
                  HtmlWebpackPlugin.createHtmlTagObject('link', {
                    rel: 'prefetch',
                    href: asset,
                  })
                );
              const preload = this.options.preload
                .reduce(
                  (acc, pattern) => [
                    ...acc,
                    ...match(assets, pattern, { matchBase: true }),
                  ],
                  []
                )
                .sort() // consistant assets order
                .map((asset) => resolve(publicPath, asset))
                .map((asset) =>
                  HtmlWebpackPlugin.createHtmlTagObject(
                    'link',
                    preloadAttrAlgorithm(asset)
                  )
                );

              const payload = {
                ...assetTagGroups,
                headTags: [...assetTagGroups.headTags, ...prefetch, ...preload],
              };

              callback(null, payload);
            }
          );
        }
      }
    );
  }
}

export default NetworkHints;
