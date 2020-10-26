// package
// eslint-disable-next-line
const WebpackError = require('webpack/lib/WebpackError');

class RequireHtmlWebpackPluginError extends WebpackError {
  constructor() {
    super();

    // copy from official warning class
    this.name = 'RequireHtmlWebpackPluginError';
    this.message =
      'WebpackPluginNetworkHints: Unable to find an instance of HtmlWebpackPlugin in the current compilation.';

    // copy from official warning class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default RequireHtmlWebpackPluginError;
