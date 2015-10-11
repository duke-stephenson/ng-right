/**
 * @author john
 * @version 10/9/15 11:00 AM
 */


import gulp from 'gulp';
import changeLog from 'gulp-conventional-changelog';
import ts from 'gulp-typescript';
import dts from 'dts-bundle';
import del from 'del';
import merge from 'merge2';


gulp.task('changelog', () => {
  return gulp.src('changelog.md')
    .pipe(changeLog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('rm', done => {
  return del('lib', done);
});

let project = ts.createProject('tsconfig.json', {
  noExternalResolve: true,
  failOnTypeErrors: true,
  declaration: true
});

gulp.task('ts', () => {

  let result = project.src({base: './ts'})
    .pipe(ts(project));

  return merge([
    result.js.pipe(gulp.dest('lib')),
    result.dts.pipe(gulp.dest('lib'))
  ]);
});


gulp.task('dts', (done) => {

  dts.bundle({
    //externals: true,
    name: 'ng-right',
    main: 'lib/ts/index.d.ts',
    out: 'index.d.ts'
  });
  return done();

});

gulp.task('run', () => {
  gulp.watch('ts/**/*.ts', gulp.series('ts'));
});

gulp.task('default', gulp.series('rm', 'ts', 'dts'));
