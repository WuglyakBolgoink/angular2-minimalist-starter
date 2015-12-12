import * as gulp from 'gulp';
import * as del from 'del';
import * as path from 'path';
import * as runSequence from 'run-sequence';
import * as plumber from 'gulp-plumber';
import * as typescript from 'gulp-typescript';
import * as inject from 'gulp-inject';
import * as template from 'gulp-template';
import * as jslint from 'gulp-tslint';
import * as inlineNg2Template from 'gulp-inline-ng2-template';
import * as jslintStylish from 'gulp-tslint-stylish';
import * as shell from 'gulp-shell';
import * as nodemon from 'gulp-nodemon';
import {Server} from 'karma';
import * as ts from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import * as tinylrFn from 'tiny-lr';

import {PATH, LIVE_RELOAD_PORT, APP_BASE, APP_VERSION} from './tools/config';

const JSLIB_SRC: string[] = PATH.src.jslib.concat(PATH.src.jslib_copy_only);

export const templateLocals = {
  APP_VERSION,
  APP_BASE
};

const tinylr = tinylrFn();

export function notifyLiveReload(changedFiles: string[]) {
  tinylr.changed({
    body: { files: changedFiles }
  });
}

const tsProject = ts.createProject('tsconfig.json');

function compileJs(src: string | string[], dest: string, inlineTpl?: boolean): NodeJS.ReadWriteStream {

  let result = gulp.src(src)
    .pipe(plumber())
    .pipe(sourcemaps.init());

  if (inlineTpl) {
    result = result.pipe(inlineNg2Template({ base: PATH.src.base }));
  }

  return result.pipe(typescript(tsProject))
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
}

function lintJs(src: string | string[]) {
  return gulp.src(src)
    .pipe(jslint())
    .pipe(jslint.report(jslintStylish));
}

// --------------
// Client.
gulp.task('csslib.build', () =>
  gulp.src(PATH.src.csslib)
    .pipe(gulp.dest(PATH.dest.app.lib))
);

gulp.task('font.build', () =>
  gulp.src(PATH.src.font)
    .pipe(gulp.dest(PATH.dest.app.font))
);

gulp.task('jslib.build', () => {
  const jslibSrc = gulp.src(JSLIB_SRC)
    .pipe(gulp.dest(PATH.dest.app.lib));
  const srcRxjs = gulp.src('node_modules/rxjs/**/*')
    .pipe(gulp.dest(PATH.dest.app.lib + '/rxjs'));
  return [jslibSrc, srcRxjs];
});

gulp.task('jslib.watch', ['jslib.build'], () =>
  gulp.watch(JSLIB_SRC, (evt) =>
    runSequence('jslib.build', () => notifyLiveReload([evt.path]))
  )
);

gulp.task('css.build', () =>
  gulp.src(PATH.src.css)
    .pipe(gulp.dest(PATH.dest.app.component))
);

gulp.task('css.watch', ['css.build'], () =>
  gulp.watch(PATH.src.css, (evt) =>
    runSequence('css.build', () => notifyLiveReload([evt.path]))
  )
);

gulp.task('tpl.build', () =>
  gulp.src(PATH.src.tpl)
    .pipe(gulp.dest(PATH.dest.app.component))
);

gulp.task('tpl.watch', ['tpl.build'], () =>
  gulp.watch(PATH.src.tpl, (evt) =>
    runSequence('tpl.build', () => notifyLiveReload([evt.path]))
  )
);

gulp.task('js.build', () => {
  return compileJs(PATH.src.ts, PATH.dest.app.base);
});

gulp.task('js.watch', ['js.build'], () =>
  gulp.watch(PATH.src.ts, (evt) => {
    runSequence('js.build', () => notifyLiveReload([evt.path]));
  })
);

gulp.task('index.build', () => {

  const MAP_REGEXP = /(\.map)$/;

  function filterNoMap(paths: string[]): string[] {
    return paths.filter(path => !MAP_REGEXP.test(path));
  }

  function transformPath (filepath: string) {
    arguments[0] = 'lib/' + path.basename(filepath);
    return inject.transform.apply(inject.transform, arguments);
  }

  const JSLIB_INJECTABLES_TARGET = gulp.src(filterNoMap(PATH.src.jslib));
  const CSSLIB_INJECTABLES_TARGET = gulp.src(filterNoMap(PATH.src.csslib));
  const CSS = gulp.src(filterNoMap(PATH.src.css));

  return gulp.src(PATH.src.index)
    .pipe(inject(CSSLIB_INJECTABLES_TARGET, {
      name: 'csslib',
      transform: transformPath
    }))
    .pipe(inject(JSLIB_INJECTABLES_TARGET, {
      name: 'jslib',
      transform: transformPath
    }))
    .pipe(inject(CSS, {
      transform: function(filepath: string) {
        arguments[0] = filepath.replace(`/${PATH.src.base}/`, '');
        return inject.transform.apply(inject.transform, arguments);
      }
    }))
    .pipe(template(templateLocals))
    .pipe(gulp.dest(PATH.dest.app.base));
});

gulp.task('index.watch', ['index.build'], () =>
  gulp.watch(PATH.src.index, (evt) =>
    runSequence('index.build', () => notifyLiveReload([evt.path]))
  )
);

gulp.task('build', ['dist.clean'], (done: gulp.TaskCallback) =>
  runSequence(
    [
      'csslib.build',
      'font.build',
      'jslib.build',
      'css.build',
      'tpl.build',
      'jslint',
      'js.build'
    ],
    'index.build',
    done)
);

gulp.task('build.watch', ['dist.clean'], (done: gulp.TaskCallback) =>
  runSequence(
    [
      'csslib.build',
      'font.build',
      'jslib.watch',
      'css.watch',
      'tpl.watch',
      'jslint.watch',
      'js.watch',
    ],
    'index.watch',
    done)
);

// --------------
// Serve.
gulp.task('server.watch', () => {

  nodemon({
    script: 'server/bootstrap.ts',
    watch: 'server',
    ext: 'ts',
    env: { 'profile': process.env.profile },
    execMap: {
      ts: 'ts-node'
    }
  }).on('restart', () => {
    process.env.RESTART = true;
  });

  tinylr.listen(LIVE_RELOAD_PORT);
});

gulp.task('serve', (done: gulp.TaskCallback) =>
  runSequence('build.watch', 'server.watch', done)
);

// --------------
// Test.
gulp.task('test.build', () => {
  const src = [`${PATH.src.base}/**/*.ts`, `!${PATH.src.base}/bootstrap.ts`];
  return compileJs(src, PATH.dest.test, true);
});

gulp.task('test.watch', ['test.build'], () =>
  gulp.watch(PATH.src.ts, 'test.build')
);

gulp.task('karma.start', (done: gulp.TaskCallback) => {
  new Server({
    configFile: `${PATH.cwd}/karma.conf.js`,
    singleRun: true
  }).start();
  done();
});

gulp.task('test', ['test.clean'], (done: gulp.TaskCallback) =>
  runSequence(['jslint', 'test.build'], 'karma.start', done)
);

// --------------
// Lint.
gulp.task('jslint', () =>
  lintJs(PATH.jslint)
);

gulp.task('jslint.watch', ['jslint'], () =>
  gulp.watch(PATH.jslint, (evt) =>
    lintJs(evt.path)
  )
);

// --------------
// Clean.
gulp.task('clean', ['dist.clean', 'test.clean', 'tmp.clean']);

gulp.task('dist.clean', () =>
  del(PATH.dest.app.base)
);

gulp.task('test.clean', () =>
  del(PATH.dest.test)
);

gulp.task('tmp.clean', () =>
  del(PATH.dest.tmp)
);

// --------------
// Postinstall.
gulp.task('npm', () =>
  shell.task(['npm prune'])
);

gulp.task('tsd', () =>
  shell.task(['tsd reinstall --clean', 'tsd link', 'tsd rebundle'])
);

gulp.task('postinstall', (done: gulp.TaskCallback) =>
  runSequence('clean', 'npm', done)
);
