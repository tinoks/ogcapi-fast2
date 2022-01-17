module.exports = function convertPath (str) {
  return str.replace(/\{/g, ':').replace(/}/g, '')
}
