var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var placeholder = require('metalsmith-placeholder');
var permalinks = require('metalsmith-permalinks');
var path = require('metalsmith-path');

var metadata = require('./metadata.js');

// Build posts
metalsmith(__dirname)
	.metadata(metadata)
	.use(collections({
		articles: {
			pattern: 'articles/**/*.md',
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(markdown())
	.use(placeholder())
	 // Must be after markdown, placeholder. Path seems to get clobbered otherwise.
	// .use(permalinks({
	// 	relative: false
	// }))
	.use(path())
	// .use(function (files, smith, done) {
	// 	console.log(files)
	// 	done()
	// })
	.use(layouts({ // Before articles, otherwise the whole article page, header/footer and all, gets injected to index.
		engine: 'jade',
		pattern: '{index.html, feed.xml, archive/index.html}'
	}))
	.use(layouts({
		engine: 'jade',
		pattern: 'articles/**/*.html',
		default: 'article.jade'
	}))
	.build(function (err) {
		if (err) throw err;
	});