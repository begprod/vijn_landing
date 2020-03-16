const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const gulpPug = require('gulp-pug');
const gulpUglify = require('gulp-uglify');
const gulpConcat = require('gulp-concat');
const gulpIf = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const postCss = require('gulp-postcss');
const postCssCustomProperties = require('postcss-css-variables');
const postCssCustomMedia = require('postcss-custom-media');
const postCssImport = require('postcss-import');
const postCssNested = require('postcss-nested');
const cssNano = require('cssnano');
const browserify = require("browserify");
const babelify = require("babelify");
const sourcemaps = require('gulp-sourcemaps');
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const server = require('browser-sync');
const reload = server.reload;

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';


const serverConfig = {
	server: {
		baseDir: './build'
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: 'vijn'
};

const path = {
	src: {
		html: './src/templates/pages/*.pug',
		css: './src/css/styles.css',
		js: {
			app: './src/js/app/script.js',
			vendor: './src/js/vendor/*.js'
		},
		assets: './src/assets/**/*.*'
	},
	build: {
		html: './build/',
		css: './build/css/',
		js: {
			app: './build/js/',
			vendor: './build/js/vendor/'
		},
		assets: './build/assets/'
	},
	watch: {
		html: './src/templates/**/*.pug',
		css: './src/css/**/*.css',
		js: {
			app: './src/js/app/**/*.js',
			vendor: './src/js/vendor/*.js'
		},
		assets: './src/assets/**/*.*'
	}
};

gulp.task('html', () => {
	return gulp.src(path.src.html)
		.pipe(gulpPug({
			pretty: true
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream:true}));
});

gulp.task('css', () => {
	return gulp.src(path.src.css)
		.pipe(gulpIf(isDev, sourcemaps.init()))
		.pipe(postCss([
			postCssImport,
			postCssCustomProperties({
				preserve: true
			}),
			postCssCustomMedia,
			postCssNested,
			cssNano]))
		.pipe(autoprefixer())
		.pipe(gulpIf(isDev, sourcemaps.write()))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream:true}));
});

gulp.task('js:app', () => {
	return browserify({
			entries: [path.src.js.app],
			debug: isDev,
			transform: [babelify.configure({ presets: ['@babel/preset-env'], sourceMaps: isDev })]
		})
		.bundle()
		.pipe(source('app.min.js'))
		.pipe(buffer())
		.pipe(gulpIf(isDev, sourcemaps.init({loadMaps: isDev})))
		.pipe(gulpUglify())
		.pipe(gulpIf(isDev, sourcemaps.write('./')))
		.pipe(gulp.dest(path.build.js.app))
		.pipe(reload({stream:true}));
});

gulp.task('js:vendor', () => {
	return gulp.src(path.src.js.vendor)
		.pipe(gulpConcat('vendor.js'))
		.pipe(gulp.dest(path.build.js.vendor))
		.pipe(reload({stream:true}));
});

gulp.task('assets', () => {
	return gulp.src(path.src.assets)
		.pipe(gulp.dest(path.build.assets))
});

gulp.task('watch', () => {
	gulp.watch(path.watch.html, gulp.series('html'));
	gulp.watch(path.watch.css, gulp.series('css'));
	gulp.watch(path.watch.js.app, gulp.series('js:app'));
	gulp.watch(path.watch.js.vendor, gulp.series('js:vendor'));
	gulp.watch(path.watch.assets, gulp.series('assets'));
});

gulp.task('server', () => {
	server(serverConfig);
});

gulp.task('dev', gulp.series(
	gulp.series(
		'html',
		'css',
		'js:app',
		'js:vendor',
		'assets'
	),
	gulp.parallel(
		'server',
		'watch'
	)
));

gulp.task('prod', gulp.series(

	gulp.series(
		'html',
		'css',
		'js:app',
		'js:vendor',
		'assets'
	)
));
