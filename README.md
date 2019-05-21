# network-hints

![Build Status](https://img.shields.io/travis/coco-platform/network-hints/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/coco-platform/network-hints/badge.svg?branch=master)](https://coveralls.io/github/coco-platform/?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/coco-platform/network-hints.svg)](https://greenkeeper.io/)
![Package Dependency](https://david-dm.org/coco-platform/network-hints.svg?style=flat)
![Package DevDependency](https://david-dm.org/coco-platform/network-hints/dev-status.svg?style=flat)

An extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).

Inject [resource-hints](https://www.w3.org/TR/resource-hints/) into html, to [improve your load time](https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#.ejrj8kvk9).

## Installation

pre-requirement:

```
webpack >= 4.0.0
node >= 10.0.0
```

Install the plugin with npm:

```shell
$ npm install --save-dev @coco-platform/webpack-plugin-network-hints
```

Install the plugin with yarn:

```shell
$ yarn add --dev @coco-platform/webpack-plugin-network-hints
```

## Usage

Load the plugin:

```javascript
const {
  NetworkHintsPlugin,
} = require('@coco-platform/webpack-plugin-network-hints');
```

and add it to your webpack config as follow:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new NetworkHintsPlugin({
    prefetch: ['**/*.*'],
    preload: ['**/*.*'],
  }),
];
```

# Licence

MIT
