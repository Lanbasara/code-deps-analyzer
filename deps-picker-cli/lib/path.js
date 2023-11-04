const path = require('path');

const publicPath = '../../example';

/**
 * Returns the absolute path of a file based on the origin and path.
 *
 * @param {string} origin - The origin path.
 * @param {string} path - The path to resolve.
 * @return {string} The absolute path.
 */
function getAbsPath(originPath, sourcePath) {
  if (path.isAbsolute(sourcePath)) return sourcePath;
  if (sourcePath.startsWith('.')) {
    return path.resolve(path.dirname(originPath), sourcePath);
  } else {
    const resolvedPath = require.resolve(sourcePath, {
      paths: [path.join(__dirname, publicPath)],
    });
    return path.dirname(resolvedPath);
  }
}

module.exports = {
  getAbsPath,
  publicPath,
};
