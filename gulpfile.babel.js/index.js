/**
 * @author john
 * @version 10/9/15 11:00 AM
 */


import gulp from 'gulp';
import changeLog from 'gulp-conventional-changelog';
import ts from 'gulp-typescript';
import dts from 'dts-bundle';
import del from 'del';


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

let project = ts.createProject('tsconfig.json');

gulp.task('ts', () => {
    return project.src()
    .pipe(ts(project))
    .js
    .pipe(gulp.dest('lib'));
});


gulp.task('dts', () => {

    return dts.bundle({
        //externals: true,
        name: 'ng-right',
        main: 'lib/index.d.ts'
    });

});

gulp.task('run', () => {
    gulp.watch('ts/**/*.ts', gulp.series('ts'));
});

gulp.task('default', gulp.series('rm', 'ts', 'dts'));

