var gulp = require('gulp'),
		concatCss = require('gulp-concat-css'),
		autoprefixer = require('gulp-autoprefixer'),
		rename = require('gulp-rename'),
		minifyCss = require('gulp-minify-css'),
  	concat = require('gulp-concat'),
  	uglify = require('gulp-uglify'),
		compass = require('gulp-compass'),
		path = require('path'),
    webserver = require('gulp-webserver'),
		ngAnnotate = require('gulp-ng-annotate'),
		sourcemaps = require('gulp-sourcemaps'),
		bower = require('gulp-bower'),
		jshint = require('gulp-jshint'),
		serve = require('gulp-serve'),
		notify = require('gulp-notify'),
		mainBowerFiles = require('main-bower-files'),
		livereload = require('gulp-livereload'),
		connect = require('gulp-connect'),
		history = require('connect-history-api-fallback'),
		rev = require('gulp-rev'),
		revCollector = require('gulp-rev-collector'),
		gutil = require('gulp-util'),
		rimraf = require('rimraf'),
		revOutdated = require('gulp-rev-outdated'),
		path = require('path'),
		through = require('through2');


var options = {
	pathBower: './bower_components/',
	pathFrom: './src/client/',
	pathTo: './build/'
};


var scripts = [
	options.pathFrom + '**/*.module.js',
	options.pathFrom + 'app/**/*.js'
];


var templates = [
	options.pathFrom + '**/*.html'
];

var json = [
	options.pathFrom + '**/*.json'
];

var config = [
	options.pathFrom + 'config/*.js'
];


var bowerAssetsCss = [
	options.pathBower + 'bootstrap/dist/css/bootstrap.min.css',
	options.pathBower + 'angular-toastr/dist/angular-toastr.min.css'
];


var bowerFonts = [
	options.pathBower + 'bootstrap/fonts/**/*',
	options.pathBower + 'font-awesome/fonts/**/*'
];


gulp.task('bower', function() {
    return gulp.src(mainBowerFiles(), { base: './bower_components' })
				.pipe(concat('lib.js'))
				// .pipe(uglify())
				.pipe(gulp.dest(options.pathTo + 'js'));
});


gulp.task('bower_css', function() {
  gulp.src(bowerAssetsCss)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest(options.pathTo + 'css'));


	gulp.src(bowerFonts)
    .pipe(gulp.dest(options.pathTo + 'fonts'));

	// gulp.src(bower_assets)
  //   .pipe(gulp.dest(options.pathTo + 'packages'));
});


gulp.task('angular', function() {
  return gulp.src(scripts)
		.pipe(sourcemaps.init())
		// .pipe(jshint())
		// 	.pipe(jshint.reporter('YOUR_REPORTER_HERE'))
    .pipe(concat('app.js'))
		.pipe(ngAnnotate())
    .pipe(uglify())
		// .pipe(sourcemaps.write())
		.pipe(rev())
    .pipe(gulp.dest(options.pathTo + 'js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest(options.pathTo + 'js'))
		.pipe(notify('Angular compile done!'));
});


gulp.task('templates', function() {
  return gulp.src(templates)
    .pipe(gulp.dest(options.pathTo));
});


gulp.task('json', function() {
  return gulp.src(json)
    .pipe(gulp.dest(options.pathTo));
});

gulp.task('config', function() {
  return gulp.src(config)
    .pipe(gulp.dest(options.pathTo + 'config'));
});


gulp.task('compass', function() {
  gulp.src(options.pathFrom + 'scss/style.scss')
    .pipe(compass({
      css: options.pathFrom + 'css',
      sass: options.pathFrom + 'scss'
    }))
  	.pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false
    }))
  	.pipe(minifyCss())
    .pipe(rename('style.css'))
		.pipe(rev())
		.pipe(gulp.dest(options.pathTo + 'css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest(options.pathTo + 'css'));

});


gulp.task('images', function() {
  return gulp.src(options.pathFrom + 'images/**/*')
    .pipe(gulp.dest(options.pathTo + 'images'));
});


gulp.task('connect', function() {

	var middleware = history({});

	connect.server({
		root: ['build'],
 		livereload: false,
		port: 2000,
		middleware: function(connect, opt) {
			return [ middleware ];
		}
	});
});

gulp.task('rev_collector', ['compass', 'angular', 'templates'], function () {
    return gulp.src(['build/css/rev-manifest.json', 'build/js/rev-manifest.json', 'build/index.html'])
        .pipe( revCollector({
            replaceReved: true
        }) )
        .pipe( gulp.dest(options.pathTo) );
});

function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task('clean', ['rev_collector'], function() {
    gulp.src([options.pathTo + '/**/*.*'], {read: false})
        .pipe( revOutdated(2) )
        .pipe( cleaner() );

    return;
});

gulp.task('watch', function(){
    gulp.watch(options.pathFrom + 'scss/**/*.scss', ['clean']);
    gulp.watch(options.pathFrom + 'app/**/*.js', ['clean']);
    gulp.watch(options.pathFrom + '**/*.html', ['clean']);
});

gulp.task('default', [
	'connect',
	'templates',
	'images',
	'bower',
	'bower_css',
	'json',
	'config',
	'clean',
	'watch'
]);
