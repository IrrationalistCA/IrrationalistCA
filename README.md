# The Irrationalist -- Static Site Generator
This repository comprises The Irrationalist's site generator. Use it to write, develop, and deploy The Irrationalist.
## Quick Start Guide
1. [Download](https://nodejs.org/download/) and install Node.js
2. [Download](http://git-scm.com/) and install Git
3. Hop into your shell and clone this repository:

	git clone git@github.com:jczerwinski/irrationalist.git

This will create an `irrationalist` folder in your working directory.

4. Hop into your repository and install the dependencies:

	cd irrationalist
	npm install

You're now ready to get started! Your next steps depend on what you want to do.

### Write an Article
1. Create a new folder in `content/articles'. The name of the folder should match the title of your article, but should only include numbers, lowercase letters, and dashes.
2. Create a new Markdown file in the folder. It should have the same filename as the name of the folder you just created. eg. `content/articles/my-article/my-article.md`
3. Start writing! Put any assets like images or scripts for your article in `content/assets` for now -- we'll set things up so we can put them in the same folder as the article soon. 

### Metadata
#### title
The title of this page/article. Captitalize properly, be search engine friendly, etc.

#### author
The nickname of the author of the article. Must be the same as an author in `metadata/offers.yaml`.

#### date
The date of publication. YYYY-MM-DD

#### layout
#### teaser
A short description of the article, up to a few sentences. Will be displayed as the article description in feed readers.