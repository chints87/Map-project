var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task("default", function() {
  console.log('ho gaya beh guuulp!!')
});

gulp.task('styles', function(){
	gulp.src('sass/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer({
	    	browsers: ["last 2 versions"]
	    	})
	    )
	    .pipe(gulp.dest('./css'));
	gulp.watch('sass/**/*.scss',['styles']);
	    
});