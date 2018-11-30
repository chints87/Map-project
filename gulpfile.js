var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

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
	    .pipe(gulp.dest('./css'))
	    .pipe(browserSync.reload({
	    	stream: true
	    }))
	    
});

gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir: './'
		},
	})
});

gulp.task('watch', ['browserSync', 'styles'], function(){
	gulp.watch('sass/**/*.scss',['styles']);
});