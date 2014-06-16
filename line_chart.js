$(function() {
  var w = 600, h = 400, padding = 80;
  var maxValue = 123;
  var dataset = [
    {month: '2013-04', enrollment: 123},
    {month: '2013-05', enrollment: 90},
    {month: '2013-06', enrollment: 20},
    {month: '2013-07', enrollment: 12},
    {month: '2013-08', enrollment: 3},
    {month: '2013-09', enrollment: 1},
    {month: '2013-10', enrollment: 0},
    {month: '2013-11', enrollment: 0},
    {month: '2013-12', enrollment: 1},
    {month: '2014-01', enrollment: 0},
    {month: '2014-02', enrollment: 20},
    {month: '2014-03', enrollment: 0}
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

  // スケール
  var xScale = d3.time.scale()
               .domain(d3.extent(dataset, function(d) { return d.month; }))
               .range([padding, w - padding]);
  var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d) { return d.enrollment; })])
               .range([h - padding, padding]);
  // 軸関数
  var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient('bottom');
  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient('left')
              .ticks(5);
  // x軸
  svg.append('g')
  .classed('axis', true)
  .attr('transform', 'translate(0, ' + (h - padding) + ')')
  .call(xAxis)
  .selectAll('text')
  .attr('transform', 'rotate(-45)')
  .attr('x', -15)
  .attr('y', 20);
  // y軸
  svg.append('g')
  .classed('axis y', true)
  .attr('transform', 'translate(' + padding + ', 0)')
  .call(yAxis)

  // 折れ線
  var line = d3.svg.line()
             .x(function(d) {
               return xScale(d.month);
             })
             .y(function(d) {
               return yScale(d.enrollment);
             });
  var linePath = svg.append('path')
  .datum(dataset)
  .attr('class', 'line')
  .attr('d', line);

  // 点
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
      return yScale(d.enrollment);
    },
    'r': 6
  });

  // 更新ボタンをリスナーとして登録
  d3.select('#update').on('click', function() {
    dataset.forEach(function(d) {
      d.enrollment = Math.floor(Math.random() * maxValue);
    });
    yScale.domain([0, d3.max(dataset, function(d) {
                        return d.enrollment;
                      })]);

    // y軸の更新
    d3.select('.y.axis').transition().duration(1000).call(yAxis);

    // 点の更新
    circles = svg.selectAll('.point');
    circles.data(dataset)
    .transition()
    .duration(1000)
    .attr({
      'cx': function(d) {
        return xScale(d.month);
      },
      'cy': function(d) {
        return yScale(d.enrollment);
      }
    });

    // 線の更新
    linePath.datum(dataset)
    .transition()
    .duration(1000)
    .attr('d', line);
  });

  d3.select('#add').on('click', function() {
    var newEnrollment = Math.floor(Math.random() * maxValue);
    var maxMonth = d3.max(dataset, function(d) {
                      return new Date(d.month);
                    });
    var newMonth = maxMonth.setMonth(maxMonth.getMonth() + 1);
    dataset.push({'month': newMonth, 'enrollment': newEnrollment});

    xScale.domain(d3.extent(dataset, function(d) {
                    return d.month;
                  }));

    var circles = svg.selectAll('.point'); // 追加ボタンを押すたびに取得しなおす必要があるみたい
    circles.data(dataset)
    .enter()
    .append('circle')
    .classed('point', true)
    .attr({
      'cx': function(d) {
        return xScale(d.month);
      },
      'cy': function(d) {
        return yScale(d.enrollment);
      },
      'r': 6
    });

    // 更新
    // 線
    var linePath = svg.select('.line');
    linePath.datum(dataset)
    .transition()
    .attr('d', line);
    // 点
    circles.transition()
    .attr({
      'cx': function(d) {
        return xScale(d.month);
      }
    });
  });
});
