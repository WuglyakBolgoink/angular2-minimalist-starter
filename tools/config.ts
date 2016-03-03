import * as argv from 'yargs';
import * as slash from 'slash';

const CWD = slash(process.cwd());

// --------------
// Configuration.
process.env.APP_ENVIRONMENT = argv['env'] || process.env.APP_ENVIRONMENT || 'development';

export const IS_PROD = process.env.APP_ENVIRONMENT === 'production';

export const PORT = 5555;
export const LIVE_RELOAD_PORT = 4002;
export const APP_BASE = '/';

const TSC_OPTS = require(`${CWD}/tsconfig.json`).compilerOptions;

TSC_OPTS.allowJs = true;
TSC_OPTS.forceConsistentCasingInFileNames = true;
TSC_OPTS.pretty = true;

export const TSC_APP_OPTS = Object.assign({}, TSC_OPTS);
export const TSC_TEST_OPTS = Object.assign({}, TSC_OPTS, {outFile: undefined, outDir: 'tmp/test'});

const TMP_BASE = 'tmp';
const CLIENT_SRC_BASE = 'client';
const CLIENT_DEST_BASE = 'dist';
const LIB_SRC = `node_modules`;

console.log('process.env.APP_ENVIRONMENT: ', process.env.APP_ENVIRONMENT);


export const PATHS = {
  cwd: CWD,
  src: {
    vendor: {
      base: LIB_SRC,
      js: [
        `${LIB_SRC}/es6-shim/es6-shim.js`,
        `${LIB_SRC}/systemjs/dist/system.src.js`,

        `${LIB_SRC}/angular2/bundles/angular2-polyfills.js`,
        `${LIB_SRC}/angular2/bundles/angular2.js`,
        `${LIB_SRC}/angular2/bundles/router.js`,
        `${LIB_SRC}/angular2/bundles/http.js`,
      ],
      jsCopyOnly: [
        `${LIB_SRC}/systemjs/dist/system-polyfills.js`,
      ],
      font: [
        `${LIB_SRC}/bootstrap/dist/fonts/*`
      ],
      css: [
        `${LIB_SRC}/bootstrap/dist/css/bootstrap.css`
      ]
    },
    custom: {
      index: `${CLIENT_SRC_BASE}/index.html`,
      tpl: `${CLIENT_SRC_BASE}/components/**/*.html`,
      css: `${CLIENT_SRC_BASE}/components/**/*.css`,
      tsApp: [
        `${CLIENT_SRC_BASE}/**/*.ts`,
        `!${CLIENT_SRC_BASE}/**/*_spec.ts`
      ],
      tsLint: [
        `${CLIENT_SRC_BASE}/**/*.ts`,
        `server/**/*.ts`,
        `tools/**/*.ts`,
        `gulpfile.ts`
      ],
      test: `${CLIENT_SRC_BASE}/**/*_spec.ts`
    }
  },
  dest: {
    tmp: TMP_BASE,
    test: `${TMP_BASE}/test`,
    coverage: `${TMP_BASE}/coverage`,
    dist: {
      base: CLIENT_DEST_BASE,
      app: `${CLIENT_DEST_BASE}/app`,
      lib: `${CLIENT_DEST_BASE}/lib`,
      font: `${CLIENT_DEST_BASE}/fonts`,
      component: `${CLIENT_DEST_BASE}/components`
    }
  }
};





