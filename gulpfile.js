let gulp = require('gulp'),
    argv = require('yargs').argv,
    browserSync = require('browser-sync').create(),
    config = require('./gulp/config'),
    env = argv.env || 'development',
    envConfig = config[env],
    paths = envConfig.paths,
    plugins = envConfig.plugins,
    getTask = require('./gulp/utils').getTask;

gulp.task('js', getTask('js')(paths.js, plugins, env == 'development' ? true : false, browserSync, env == 'production' ? true : false));
gulp.task('styles', getTask('styles')(paths.styles, plugins));
gulp.task('fonts', getTask('fonts')(paths.fonts));
gulp.task('html', getTask('html')(paths.html));
gulp.task('manifest', getTask('manifest')(paths.manifest));
gulp.task('favicon', getTask('favicon')(paths.favicon));
gulp.task('sw', getTask('sw')(paths.sw, plugins));
gulp.task('img', getTask('img')(paths.img, plugins));
gulp.task('lint', getTask('lint')(paths.js.all));
gulp.task('browserSyncReload', () => browserSync.reload());

gulp.task('build', ['html', 'styles', 'fonts', 'manifest', 'favicon', 'js', 'sw', 'img']);

gulp.task('serve', ['lint', 'build'], () => {
  browserSync.init({
    server: './www'
  });
  gulp.watch(paths.js.all, ['lint']);
  gulp.watch(paths.html.src, ['html', 'browserSyncReload']);
  gulp.watch(paths.styles.watchSrc, ['styles', 'browserSyncReload']);
});
