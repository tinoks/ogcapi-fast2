const yaml = require('js-yaml');

const fs = require('fs');
const path = require('path');


function* getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}


function isPlainObject(obj) {
  return isObject(obj) && (
    obj.constructor === Object  // obj = {}
    || obj.constructor === undefined // obj = Object.create(null)
  );
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (Array.isArray(target)) {
    if (Array.isArray(source)) {
      target.push(...source);
    } else {
      target.push(source);
    }
  } else if (isPlainObject(target)) {
    if (isPlainObject(source)) {
      for (let key of Object.keys(source)) {
        if (!target[key]) {
          target[key] = source[key];
        } else {
          mergeDeep(target[key], source[key]);
        }
      }
    } else {
      throw new Error(`Cannot merge object with non-object`);
    }
  } else {
    target = source;
  }

  return mergeDeep(target, ...sources);
};

module.exports = {
  getSpec : () => {
    spec = {};
    for (const file of getFiles('./src/api')) {
      if(path.extname(file) == ".yaml"){
        const filecontent = yaml.load(fs.readFileSync(file, 'utf8'))
        spec = mergeDeep(spec, filecontent)
      }
    }
    spec = JSON.parse(JSON.stringify(spec).replace(/"\w*-\w*-\d*.yaml/g, '"'));
    spec.servers = [{ url: process.env.BASEURL }]

    return spec;
  },

  getHandler : () => {
    let handler = {};
    for (const file of getFiles('./src/handlers')) {
      const filecontent = require(file);
      handler = { ...handler, ...filecontent }
    }

    return handler;
  }

}
