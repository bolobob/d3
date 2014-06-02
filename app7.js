$(function() {
  var w = 500, h = 300;
  var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150]
  ];
  var padding = 20;
  var xScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d) { return d[0]; })])
               .range([padding, w - padding * 2]);
  var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d) { return d[1]; })])
               .range([h - padding, padding]);
  var rScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d) { return d[1]; })])
               .range([2, 5]);
  var svg3 = d3.select('body').append('svg').attr({width: w, height: h});
  svg3.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr({
    'cx': function(d) {
      return xScale(d[0]);
    },
    'cy': function(d) {
      return yScale(d[1]);
    },
    'r': function(d) {
      return rScale(d[1]);
    }
  });
  svg3.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d) {
    return d[0] + ',' + d[1];
  })
  .attr({
    'x': function(d) {
      return xScale(d[0]);
    },
    'y': function(d) {
      return yScale(d[1]);
    },
    'font-family': 'sans-serif',
    'font-size': '11px',
    'fill': 'red'
  });
});