/**
 * @author john
 * @version 10/15/15 3:36 AM
 */

import gulp from 'gulp';
import ts from 'gulp-typescript';

let project = ts.createProject('test/tsconfig.json', {
  noExternalResolve: true
});

gulp.task('test:ts', () => {
  return project.src()
    .pipe(ts(project))
    .pipe(gulp.dest('.'));
});

gulp.task('test:ci', () => {
  gulp.watch('test/**/*.ts', gulp.series('test:ts'));
});

gulp.task('test', gulp.series('test:ts', 'test:ci'));
