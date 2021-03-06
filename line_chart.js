$(function() {
  var w = 600, h = 400, padding = 80;
  //var dataset = [123, 90, 20, 12, 3, 1, 0, 0, 1, 0, 0, 0];
  var dataset = [
    {month: '2013-04', registryNum: 123},
    {month: '2013-05', registryNum: 90},
    {month: '2013-06', registryNum: 20},
    {month: '2013-07', registryNum: 12},
    {month: '2013-08', registryNum: 3},
    {month: '2013-09', registryNum: 1},
    {month: '2013-10', registryNum: 0},
    {month: '2013-11', registryNum: 0},
    {month: '2013-12', registryNum: 1},
    {month: '2014-01', registryNum: 0},
    {month: '2014-02', registryNum: 20},
    {month: '2014-03', registryNum: 0}
  ];
  var parseDate = d3.time.format('%Y-%m').parse;
  dataset.forEach(function(d) {
    d.month = parseDate(d.month);
  });
  var svg = d3.select('body').append('svg')
  .attr({
    'width': w,
    'height': h
  });
  var xScale = d3.time.scale()
               .domain(d3.extent(dataset, function(d) { return d.month; }))
               .range([padding, w - padding]);
  var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d) { return d.registryNum; })])
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
  .call(xAxis)
  .selectAll('text')
  .attr('transform', 'rotate(-45)')
  .attr('x', -15)
  .attr('y', 20);

  svg.append('g')
  .classed('axis', true)
  .attr('transform', 'translate(' + padding + ', 0)')
  .call(yAxis)

  var line = d3.svg.line()
             .x(function(d) {
               return xScale(d.month);
             })
             .y(function(d) {
               return yScale(d.registryNum);
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
    'cx': function(d) {
      return xScale(d.month);
    },
    'cy': function(d) {
      return yScale(d.registryNum);
    },
    'r': 6
  });
});