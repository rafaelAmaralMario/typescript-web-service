import gulp from 'gulp';
import clean from 'gulp-clean';
import ts from 'gulp-typescript';

export const tsProject = ts.createProject('tsconfig.json');

export const compile = () => tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));

export const cleanTask = () => gulp.src('dist', { allowEmpty: true }).pipe(clean());

export const copydbConfigFile = () => gulp.src('src/server/config/config.json').pipe(gulp.dest('dist/server/config'))

export const copydbMigrationsFolder = () => gulp.src('src/server/migrations/*').pipe(gulp.dest('dist/server/migrations'))

export const copyTestConfig = () => gulp
  .src('src/tests/unit/config/.mocharc.json')
  .pipe(gulp.dest('dist/tests/unit/config'))
  .pipe(gulp.dest('dist/tests/integration/config'));

export const build = gulp.series(cleanTask, compile, copyTestConfig, copydbMigrationsFolder, copydbConfigFile);

export default build;
