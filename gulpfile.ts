const gulp = require('gulp');
const fse = require('fs-extra');
const path = require('path');
const seq = require('gulp-sequence');
const template = require('gulp-template');
const tsLint = require('gulp-tslint');
const tsLintStylish = require('gulp-tslint-stylish');
const nodemon = require('gulp-nodemon');
const karma = require('karma');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const slash = require('slash');
const tinylr = require('tiny-lr');
const openResource = require('open');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const spawn = require('child_process').spawn;
const through2 = require('through2');
const readline = require('readline');
const loadCoverage = require('remap-istanbul/lib/loadCoverage');
const remap = require('remap-istanbul/lib/remap');
const writeReport = require('remap-istanbul/lib/writeReport');

import {PATHS, TSC_APP_OPTS, TSC_TEST_OPTS, PORT, LIVE_RELOAD_PORT, IS_PROD} from './tools/config';

const FIRST_PATH_SEGMENT = /^\/?[^\/]*/;

function notifyLiveReload(modifiedFile:string) {
  tinylr.changed(modifiedFile);
}

function compileTs(src:string | string[], tscOpts:Object, dest:string, cb?:Function) {
  const _meta = compileTs['_meta'];
  mapTsFiles(src, (files) => {
    const tscArgs = mapTscArgs(tscOpts);
    const procKey = `${src}_${dest}`;
    if (_meta[procKey]) {
      _meta[procKey].kill();
    }
    _meta[procKey] = spawn(`node`, [`./node_modules/typescript/lib/tsc.js`, ...tscArgs, ...files]);
    _meta[procKey].stdout.on('data', (data) => console.log(data.toString()));
    _meta[procKey].stderr.on('data', (data) => console.error(data.toString()));
    _meta[procKey].on('exit', (code) => {
      let error;
      if (code) {
        error = new Error(`Error #${code} while compiling ts files.`);
      }
      if (cb) {
        cb(error);
      }
    });
  });
}

compileTs['_meta'] = {};

function compileTsWatch(src:string | string[], tscOpts:Object, dest:string, cb?:Function) {
  const params = Object.assign({}, tscOpts, {watch: true});
  compileTs(src, params, dest, cb);
  gulp.watch(src, (evt:any) => {
    if (evt.type !== 'changed') {
      console.log(`File ${evt.path} ${evt.type}. Full Compilation...`);
      compileTs(src, params, dest);
    }
  });
}

function mapTsFiles(src:string | string[], cb:Function) {
  const lines = [];
  return gulp.src(src, {read: false})
    .pipe(through2.obj(function (chunk, enc, callback) {
      this.push(slash(path.relative(__dirname, chunk.path)));
      callback();
    }))
    .on('data', (data) => lines.push(data))
    .on('end', () => cb(lines));
}

function mapTscArgs(tscOpts:Object) {
  const resp = [];
  for (let prop in tscOpts) {
    if (tscOpts[prop] === undefined || tscOpts[prop] === null || tscOpts[prop] === false) {
      continue;
    }
    resp.push(`--${prop}`);
    if (tscOpts[prop] !== true) {
      resp.push(tscOpts[prop]);
    }
  }
  return resp;
}

function lintTs(src:string | string[]) {
  return gulp.src(src)
    .pipe(tsLint())
    .pipe(tsLint.report(tsLintStylish, {emitError: false}));
}

function mapDestPathForlib(filepath:string) {
  const newFilepath = path.relative(__dirname, filepath).replace(FIRST_PATH_SEGMENT, PATHS.dest.dist.lib);
  return slash(path.dirname(newFilepath));
}

function startKarma(singleRun:boolean, cb:Function) {
  new karma.Server({
    configFile: `${PATHS.cwd}/karma.conf.js`,
    singleRun: singleRun
  }, karmaDone).start();

  function karmaDone(exitCode) {
    console.log('Test Done with exit code: ' + exitCode);
    if (exitCode === 0) {
      remapCoverage();
      cb();
    } else {
      cb(new Error('Unit test failed.'));
    }
  }
}

function remapCoverage() {
  console.log('Remapping coverage to TypeScript format...');
  const coverage = loadCoverage(`${PATHS.dest.coverage}/coverage-final.json`);
  const collector = remap(coverage);
  const repHtml = writeReport(collector, 'html', `${PATHS.dest.coverage}/remap/coverage-html`);
  const repLcov = writeReport(collector, 'lcovonly', `${PATHS.dest.coverage}/remap/coverage-lcov.info`).then(() => {

    const newFile = `${PATHS.dest.coverage}/remap/coverage-lcov-abs-paths.info`;

    fse.removeSync(newFile);

    readline.createInterface({
      input: fse.createReadStream(`${PATHS.dest.coverage}/remap/coverage-lcov.info`)
    }).on('line', (line) => {
      let newLine;
      if (line.startsWith('SF:')) {
        newLine = slash(line).replace(/^SF:/, `SF:${PATHS.cwd}/`);
      } else {
        newLine = line;
      }
      fse.appendFileSync(newFile, newLine + '\n');
    });
  });
  return Promise.all([repHtml, repLcov]);
}

gulp.task('cssLib', () =>
  gulp.src(PATHS.src.vendor.css)
    .pipe(gulpIf(IS_PROD, sourcemaps.init()))
    .pipe(gulpIf(IS_PROD, cssnano()))
    .pipe(gulpIf(IS_PROD, sourcemaps.write()))
    .pipe(gulp.dest((file) => mapDestPathForlib(file.path)))
);

gulp.task('font', () =>
  gulp.src(PATHS.src.vendor.font)
    .pipe(gulp.dest(PATHS.dest.dist.font))
);

gulp.task('jsCopyOnly', () =>
  gulp.src(PATHS.src.vendor.jsCopyOnly)
    .pipe(gulp.dest((file) => mapDestPathForlib(file.path)))
);

gulp.task('jsLib', () =>
  gulp.src(PATHS.src.vendor.js)
    .pipe(gulpIf(IS_PROD, sourcemaps.init()))
    .pipe(gulpIf(IS_PROD, uglify()))
    .pipe(gulpIf(IS_PROD, sourcemaps.write()))
    .pipe(gulp.dest((file) => mapDestPathForlib(file.path)))
);

gulp.task('css.build', () =>
  gulp.src(PATHS.src.custom.css)
    .pipe(gulp.dest(PATHS.dest.dist.component))
);


gulp.task('css.watch', ['css'], () => gulp.watch(PATHS.src.custom.css, ['css']));

// --------------
// Lint.
gulp.task('tsLint', () => lintTs(PATHS.src.custom.tsLint));

gulp.task('tsLint.watch', ['tsLint'], () => gulp.watch(PATHS.src.custom.tsLint, (evt:any) => lintTs(evt.path)));

gulp.task('index', () => {

  const libStream = gulp.src(PATHS.src.vendor.css.concat(PATHS.src.vendor.js), {read: false});

  return gulp.src(PATHS.src.custom.index)
    .pipe(template({IS_PROD}))
    .pipe(inject(libStream, {
      name: 'lib',
      transform: function (filepath) {
        arguments[0] = filepath.replace(FIRST_PATH_SEGMENT, '/lib');
        return inject.transform.apply(inject.transform, arguments);
      }
    }))
    .pipe(gulp.dest(PATHS.dest.dist));
});

gulp.task('index.watch', ['index'], () => gulp.watch(PATHS.src.custom.index, ['index']));

gulp.task('lint', ['tsLint']);

gulp.task('build', ['clean.dist'], seq(
  [
    'jsCopyOnly',
    'cssLib',
    'font',
    'jsLib',
    'css',
    'tpl',
    'tsLint',
    'ts',
    'index'
  ])
);

gulp.task('reload.watch', () => gulp.watch(`${PATHS.dest.dist}/**/*`, (evt:any) => notifyLiveReload(evt.path)));

gulp.task('build.watch', ['clean.dist'], seq(
  [
    'jsCopyOnly',
    'cssLib',
    'font',
    'jsLib',
    'css.watch',
    'tpl.watch',
    'ts.watch',
    'index.watch'
  ],
  'reload.watch'
));

// --------------
// Serve
gulp.task('server.watch', (done) =>
  nodemon({
    script: 'server/app.js',
    watch: 'server',
    ext: 'ts',
    env: {'APP_ENVIRONMENT': process.env.APP_ENVIRONMENT},
    execMap: {
      ts: 'ts-node'
    }
  }).on('start', () => {
    console.log('Server started');
  }).once('start', () => {
    openResource(`http://localhost:${PORT}`);
    const tinylrObj = tinylr();
    tinylrObj.listen(LIVE_RELOAD_PORT);
    done();
  })
);

gulp.task('serve', seq('build.watch', 'server.watch'));

// --------------
// Test
gulp.task('karma', ['clean.coverage'], (cb) => startKarma(true, cb));

gulp.task('ts', ['clean.dist'], (cb) => compileTs(PATHS.src.custom.tsApp, TSC_APP_OPTS, PATHS.dest.dist.app, cb));

gulp.task('ts.watch', ['tsLint.watch', 'clean.dist'], () => compileTsWatch(PATHS.src.custom.tsApp, TSC_APP_OPTS, PATHS.dest.dist.app));

gulp.task('test.build', ['clean.test'], (cb) => compileTs(PATHS.src.custom.test, TSC_TEST_OPTS, PATHS.dest.test, cb));

gulp.task('test.build.watch', ['tsLint.watch', 'clean.test'], (cb) => compileTsWatch(PATHS.src.custom.test, TSC_TEST_OPTS, PATHS.dest.test));

gulp.task('test', seq('test.build', 'karma'));

// --------------
// Clean.
gulp.task('clean', seq('clean.dist', 'clean.test', 'clean.coverage'));
gulp.task('clean.dist', (done) => fse.remove(PATHS.dest.dist, done));
gulp.task('clean.test', (done) => fse.remove(PATHS.dest.test, done));
gulp.task('clean.coverage', (done) => fse.remove(PATHS.dest.coverage, done));

gulp.task('default', ['serve']);
