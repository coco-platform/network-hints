/* eslint-disable import/no-extraneous-dependencies, no-console */

// packages
import fs from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// internal
import { NetworkHintsPlugin } from '../src';

// Scope
const mfs = Reflect.construct(MemoryFS, []);

describe('plugin test suits', () => {
  it('should complete standard workflow', (done) => {
    const configuration = {
      entry: resolve(__dirname, '__fixture__', 'index.js'),
      resolve: {
        extensions: ['.js', '.jpg'],
      },
      output: {
        path: resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        publicPath: '/',
      },
      module: {
        rules: [
          {
            test: /\.jpg$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: resolve(__dirname, '__fixture__', 'index.html'),
          inject: 'body',
        }),
        new NetworkHintsPlugin({
          prefetch: ['*.jpg'],
        }),
      ],
    };

    const compiler = webpack(configuration);
    const outputPath = `${configuration.output.path}/index.html`;

    compiler.inputFileSystem = fs;
    compiler.outputFileSystem = mfs;

    compiler.run((err) => {
      try {
        const content = mfs.readFileSync(outputPath, 'utf8');

        expect(err).toBeNull();
        expect(content).toMatchSnapshot();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
