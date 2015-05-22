---
title: Predicting Unemployment with Google Trends
author: [april, jamie]
date: 2015-05-22
teaser: Not bad.
---
Unemployment is an important economic variable. How does Google Trends data predict it?
<span class="more"></span>
<link rel="stylesheet" type="text/css" href="/articles/google-trends-canada-unemployment/style.css">
<script src="http://d3js.org/d3.v3.js"></script>

Study - https://ideas.repec.org/p/bdi/wptemi/td_891_12.html

Does it hold up for Canada? Let's take a look:

[chart]

Pretty good, even just w/ a linear regression model.

Slope   9.2650725707
Intercept   534.4038721149
R-squared   0.3202288466

median abs err  108.5396428572

50% of the time, within 108,539 from true level

<div class="oversize gtrends-unemployment-chart"></div>
<script type="text/javascript" src="/articles/google-trends-canada-unemployment/script.js"></script>