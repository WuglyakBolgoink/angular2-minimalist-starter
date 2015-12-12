import * as argv from 'yargs';
import * as fs from 'fs';

const CWD = process.cwd();
const pkg = JSON.parse(fs.readFileSync(`${CWD}/package.json`, 'utf8'));

// --------------
// Configuration.
const ENV: string = argv['env'] || process.env.profile || 'dev';
process.env.profile = ENV;

export const PORT: number = argv['port'] || 5555;
export const LIVE_RELOAD_PORT: number = argv['reload-port'] || 4002;
export const APP_BASE: string = argv['base'] || '/';
export const APP_VERSION: string = pkg.version;

const CLIENT_SRC_BASE = 'client';
const CLIENT_DEST_BASE = 'dist';
const ANGULAR_BUNDLES = './node_modules/angular2/bundles';


export const PATH = {
  cwd: CWD,
  jslint: [
    `${CLIENT_SRC_BASE}/**/*.ts`,
    `${CWD}/server/**/*.ts`,
    `tools/**/*.ts`,
    `!tools/typings/**`,
    `${CWD}/gulpfile.ts`
  ],
  src: {
    base: CLIENT_SRC_BASE,
    jslib: [
      // Order is quite important here for the HTML tag injection.
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/es6-shim/es6-shim.map',
      'node_modules/systemjs/dist/system.src.js',
      `${CLIENT_SRC_BASE}/system.config.js`,
      `${ANGULAR_BUNDLES}/angular2.dev.js`,
      `${ANGULAR_BUNDLES}/router.dev.js`,
      `${ANGULAR_BUNDLES}/http.dev.js`
    ],
    jslib_copy_only: [
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system-polyfills.js.map'
    ],
    csslib: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap.css.map'
    ],
    font: [
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
    ],
    index: `${CLIENT_SRC_BASE}/index.html`,
    tpl: [
      `${CLIENT_SRC_BASE}/components/**/*.html`,
    ],
    css: [
      `${CLIENT_SRC_BASE}/components/**/*.css`,
    ],
    ts: [`${CLIENT_SRC_BASE}/**/*.ts`, `!${CLIENT_SRC_BASE}/**/*_spec.ts`]
  },
  dest: {
    app: {
      base: CLIENT_DEST_BASE,
      lib: `${CLIENT_DEST_BASE}/lib`,
      font: `${CLIENT_DEST_BASE}/fonts`,
      component: `${CLIENT_DEST_BASE}/components`
    },
    test: 'test',
    tmp: '.tmp'
  }
};


