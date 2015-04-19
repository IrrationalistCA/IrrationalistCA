var metalsmith = require('metalsmith');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
metalsmith(__dirname)
/*	.use(watch({
		livereload: 35728
	}))*/
	.use(serve({
		verbose: true
	})).build();
// Watch -> build, livereload


// connect, livereload