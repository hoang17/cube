var gulp = require('gulp')
var clean = require('gulp-clean')

var base = {
  bin: 'bin',
}

gulp.task('clean', function() {
 return gulp.src(base.bin)
  .pipe(clean())
})

var files = [
  'yarn.lock',
  'package.json',
  'now.json',
  '.env.prod',
  '.gitignore',
  'dist/**/*',
  'views/**/*',
  'public/**/*',
  '!public/types/**/*',
]

gulp.task('copy', ['clean'], function(){

  // the base option sets the relative root for the
  // set of files, preserving the folder structure
  gulp.src(files, { base: './' })
    .pipe(gulp.dest(base.bin))

})

gulp.task('default', ['clean','copy'])
