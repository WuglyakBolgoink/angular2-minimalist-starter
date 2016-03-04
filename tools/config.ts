import * as argv from 'yargs';
import * as slash from 'slash';
import * as fse from 'fs-extra';

const CWD = slash(process.cwd());

// --------------
// Configuration.
process.env.APP_ENVIRONMENT = argv['env'] || process.env.APP_ENVIRONMENT || 'dev';

export const IS_PROD = process.env.APP_ENVIRONMENT === 'prod';

export const PORT = 5555;
export const LIVE_RELOAD_PORT = 4002;
export const APP_BASE = '/';


const TMP_BASE = 'tmp';
const CLIENT_SRC_BASE = 'client';
const CLIENT_DEST_BASE = 'dist';
const LIB_SRC = 'node_modules';
const TS_LIBS = [
  'typings/main/**/*.d.ts',
  'tools/typings/module.d.ts'
];

export const PATHS = {
  cwd: CWD,
  src: {
    vendor: {
      base: LIB_SRC,
      js: [
        `${LIB_SRC}/es6-shim/es6-shim.js`,
        `${LIB_SRC}/systemjs/dist/system.src.js`,
        `${LIB_SRC}/rxjs/bundles/Rx.js`,
        `${LIB_SRC}/reflect-metadata/Reflect.js`,

        `${LIB_SRC}/angular2/bundles/angular2-polyfills.js`,
        `${LIB_SRC}/angular2/bundles/angular2.js`,
        `${LIB_SRC}/angular2/bundles/router.js`,
        `${LIB_SRC}/angular2/bundles/http.js`,
      ],
      jsCopyOnly: [
        `${LIB_SRC}/systemjs/dist/system-polyfills.src.js`,
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
      tpl: [
        `${CLIENT_SRC_BASE}/**/*.html`,
        `!${CLIENT_SRC_BASE}/index.html`
      ],
      css: `${CLIENT_SRC_BASE}/**/*.css`,
      tsApp: TS_LIBS.concat([
        `${CLIENT_SRC_BASE}/**/*.ts`,
        `!${CLIENT_SRC_BASE}/**/*_spec.ts`
      ]),
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
  outDir: PATHS.dest.test
});

console.log('process.env.APP_ENVIRONMENT: ', process.env.APP_ENVIRONMENT);