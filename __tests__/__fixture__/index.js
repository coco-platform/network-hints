/**
 * @description - jest
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

const context = require.context('./images', false, /\.jpg$/);
const images = context.keys().map(context);
const html = images.map((image) => `<img src="${image}" />`).join('\n');

document.body.innerHTML = html;
