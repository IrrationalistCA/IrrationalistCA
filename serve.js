var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var placeholder = require('metalsmith-placeholder');
var permalinks = require('metalsmith-permalinks');
var path = require('metalsmith-path');
var drafts = require('metalsmith-drafts');

var metadata = require('./metadata.js');

// Build posts
metalsmith(__dirname)
	.metadata(metadata)
	.source('src')
	.destination('docs')
	.use(drafts())
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
	.use(permalinks({
		relative: false
	}))
	.use(path())
	.use(layouts({ // Before articles, otherwise the whole article page, header/footer and all, gets injected to index.
		pattern: '{index.html, feed.xml, archive/index.html}',
		suppressNoFilesError: true
	}))
	.use(layouts({
		pattern: 'articles/**/*.html',
		default: 'article.jade',
		suppressNoFilesError: true
	}))
	.use(serve({port: 8181}))
	.use(watch({
		paths: {
			'${source}/**/*': true,
			'layouts/**/*': true,
			'node_modules/**/*': true
		},
		livereload: true
	}))
	.build(function (err) {
		if (err) throw err;
	});