(function () {
// Array.find Polyfill
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([1, 400])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, .009])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var line = d3.svg.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

var svg = d3.select(".canada-leaders-debate-vis").append("svg")
    .attr('viewBox', '0 0 1000 750')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Pitch (hz)");

d3.tsv("/articles/debating-a-winning-tune/leaders-voice-pitch-data.tsv", function(error, data) {
  if (error) throw error;

   var kde = kernelDensityEstimator(epanechnikovKernel(75), x.ticks(100));

  for (var leader in data[0]) {
    var leaderData = data.map(function(d) {
      return parseFloat(d[leader]);
    });
    var leaderDensity = kde(leaderData);
    var max = d3.max(leaderDensity, function (d) {
          return d[1];
        });
    var location = leaderDensity.find(function (d) {
      return d[1] === max;
    });
    svg.append("path")
        .datum(leaderDensity)
        .attr("class", "line" + leader)
        .attr("d", line);
    svg.append("text")
        .attr("class", "label")
        .attr("x", x(location[0]))
        .attr("y", y(max) - 3)
        .style("text-anchor", "middle")
        .text(leader);
  }
});

function kernelDensityEstimator(kernel, x) {
  return function(sample) {
    return x.map(function(x) {
      return [x, d3.mean(sample, function(v) { return kernel(x - v); })];
    });
  };
}

function epanechnikovKernel(scale) {
  return function(u) {
    return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
  };
}
})();