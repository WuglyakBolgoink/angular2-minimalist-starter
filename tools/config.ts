import * as yargs from 'yargs';
import * as slash from 'slash';
import * as fse from 'fs-extra';

const argv = yargs.argv;
const CWD = slash(process.cwd());

process.env.APP_ENVIRONMENT = argv['env'] || process.env.APP_ENVIRONMENT || 'dev';

export const IS_PROD = process.env.APP_ENVIRONMENT === 'prod';

export const PORT = 5555;
export const LIVE_RELOAD_PORT = 4002;
export const APP_BASE = '/';

const TMP_BASE = 'tmp';
const CLIENT_SRC_BASE = 'client';
const CLIENT_DEST_BASE = 'dist';
const NM = 'node_modules';
const INDEX_HTML = `${CLIENT_SRC_BASE}/index.html`;

export const PATHS = {
  cwd: CWD,
  src: {
    vendor: {
      js: [
        `${NM}/es6-shim/es6-shim.js`,
        `${NM}/systemjs/dist/system-register-only.src.js`,
        `${NM}/rxjs/bundles/Rx.js`,
        `${NM}/angular2/bundles/angular2-polyfills.js`,
        `${NM}/angular2/bundles/angular2.js`,
        `${NM}/angular2/bundles/router.js`,
        `${NM}/angular2/bundles/http.js`,
      ],
      jsCopyOnly: [
        `${NM}/systemjs/dist/system-polyfills.src.js`,
      ],
      font: [
        `${NM}/bootstrap/dist/fonts/*`
      ],
      css: [
        `${NM}/bootstrap/dist/css/bootstrap.css`
      ]
    },
    custom: {
      index: INDEX_HTML,
      tpl: [
        `${CLIENT_SRC_BASE}/**/*.html`,
        `!${INDEX_HTML}`
      ],
      css: `${CLIENT_SRC_BASE}/**/*.css`,
      tsApp: [
        'typings/main/ambient/es6-shim/es6-shim.d.ts',
        'tools/typings/module.d.ts',
        `${CLIENT_SRC_BASE}/**/*.ts`,
        `!${CLIENT_SRC_BASE}/**/*_spec.ts`
      ],
      tsLint: [
        `gulpfile.ts`,
        `tools/**/*.ts`,
        `${CLIENT_SRC_BASE}/**/*.ts`,
        `server/**/*.ts`,
        '!tools/typings/**'
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
      appBundle: `${CLIENT_DEST_BASE}/app.bundle.js`,
      lib: `${CLIENT_DEST_BASE}/lib`,
      font: `${CLIENT_DEST_BASE}/fonts`
    }
  }
};


const TSC_OPTS = fse.readJsonSync(`${CWD}/tsconfig.json`).compilerOptions;

// Setting the following options here since them cause issues on the VSC IDE.
// TODO: move to tsconfig.json once IDE adds support for them.
TSC_OPTS.forceConsistentCasingInFileNames = true;
TSC_OPTS.pretty = true;
TSC_OPTS.module = 'system';

export const TSC_APP_OPTS = Object.assign({}, TSC_OPTS, {
  outFile: PATHS.dest.dist.appBundle,
  sourceMap: false,
  inlineSourceMap: true,
  inlineSources: true
});

export const TSC_TEST_OPTS = Object.assign({}, TSC_OPTS, {
  outFile: undefined,
  outDir: PATHS.dest.test
});

console.log('process.env.APP_ENVIRONMENT: ', process.env.APP_ENVIRONMENT);
