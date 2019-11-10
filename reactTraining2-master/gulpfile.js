"use strict";

//importing modules
var gulp = require('gulp');
var connect = require('gulp-connect'); //
var open = require('gulp-open'); //open default browser and route to home page
var browserify = require('browserify'); //help browser understand code
var babelify = require("babelify"); //jsx to native functions
var source = require('vinyl-source-stream'); //read from file and create stream out and copy somewhere else
var concat = require('gulp-concat'); //concat files
var lint = require('gulp-eslint'); //allows to run task to linting


//it is object in real world should have it's own file

//port: starting server
//dev will be localhost; paths to diff application; 
//put all in a distribute folder dist  /base/dist
var config = {
	port: 9090,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//Start a local development server
//each task has a name and callback or a function
//here connect is anme of task
//livereload when we relaod it want to hot reload

gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});


//connect is the dependency open is task name
//src take index file and pipe open will open with that dev base url in that port
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});


//html task copy all html folder and copt to dest and pipe is for gulp src produces and gulp dest is consuler and will copy it

//once done it will tell connect and new reload will load will be done
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});


//js task makes browser understandabkle and jsk to js 
//bundle all js file together and minify and name is bundle.js and provide it to gulp.dest
//finally reload
gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ["es2015", "react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

//concat all css file and name it as bundle.css
gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

//copy paste of image
gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))
		.pipe(connect.reload());
});

//finds js files and pipes to lint function and does format and reloads
gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint())
		.pipe(lint.format());
});


//watches any changes on html and it configs or runs html task
//moment linting runs or js changes is made it configs or runs js task
//watch it chnage it run in the server and show it
//['html'] any change in html

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);