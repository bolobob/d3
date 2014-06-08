$(function() {
  var w = 500, h = 300, padding = 50;
  var dataset = [123, 90, 20, 12, 3, 1, 0, 0, 1, 0, 0, 0];
  var svg = d3.select('body').append('svg')
  .attr({
    'width': w,
    'height': h
  });
  var xScale = d3.scale.ordinal()
               .domain(d3.range(dataset.length))
               .rangeBands([padding, w - padding]);
  var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset)])
               .range([h - padding, padding]);
  var xAxis = d3.svg.axis()
             .scale(xScale)
             .orient('bottom');
  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient('left')
              .ticks(5);

  svg.append('g')
  .classed('axis', true)
  .attr('transform', 'translate(0, ' + (h - padding) + ')')
  .call(xAxis);

  svg.append('g')
  .classed('axis', true)
  .attr('transform', 'translate(' + padding + ', 0)')
  .call(yAxis);

  var line = d3.svg.line()
             .x(function(d, i) {
               return xScale(i) + xScale.rangeBand() / 2;
             })
             .y(function(d) {
               return yScale(d);
             });
  svg.append('path')
  .datum(dataset)
  .attr('class', 'line')
  .attr('d', line);

  var circles = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .classed('point', true)
  .attr({
    'cx': function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    },
    'cy': function(d) {
      return yScale(d);
    },
    'r': 6
  });
});