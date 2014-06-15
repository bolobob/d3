$(function() {
  var w = 600, h = 250;
  var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  // スケール
  var xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0, w], 0.05);
  var yScale = d3.scale.linear()
             .domain([0, d3.max(dataset)])
             .range([h, 0]);

  var svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
  //var bars = svg.selectAll('rect').data(dataset);
  svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr({
    'x': function(d, i) {
      return xScale(i);
    },
    'y': function(d) {
      return yScale(d);
    }
  })
  .attr('width', xScale.rangeBand())
  .attr('height', function(d) {
    return h - yScale(d);
  })
  .attr('fill', function(d) {
    return 'rgb(0, ' + (d * 10) + ', 0)';
  });

  // bar上の数字
  svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d) {
    return d;
  })
  .attr('x', function(d, i) {
    return xScale(i) + xScale.rangeBand()/2;
  })
  .attr('y', function(d) {
    return yScale(d) + 14;
  })
  .attr({
    'font-family': 'sans-serif',
    'font-size': '11px',
    'fill': 'white',
    'text-anchor': 'middle'
  });

  // リスナー登録
  d3.select('p')
  .on('click', function() {
    var maxValue = 25;
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);
    var bars = svg.selectAll('rect').data(dataset);
    var texts = svg.selectAll('text').data(dataset);

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // newNumber分を追加
    bars.enter()
    .append('rect')
    .attr({
      'x': w,
      'y': function(d) {
        return h - yScale(d);
      },
      'width': xScale.rangeBand(),
      'height': function(d) {
        return yScale(d);
      },
      'fill': function(d) {
        return 'rgb(0, 0, ' + (d * 10) + ')';
      }
    })

    bars.transition()
    .duration(500)
    .attr({
      'x': function(d, i) {
        return xScale(i);
      },
      'y': function(d) {
        return h - yScale(d);
      },
      'width': xScale.rangeBand(),
      'height': function(d) {
        return yScale(d);
      }
    });

    texts.enter()
    .append('text')
    .attr({
      'x': function(d, i) {
        return xScale(i) + xScale.rangeBand()/2;
      },
      'y': function(d) {
        return yScale(d) + 14;
      },
      'font-family': 'sans-serif',
      'font-size': '11px',
      'fill': 'white',
      'text-anchor': 'middle'
    });

    texts.transition()
    .duration(500)
    .ease('linear')
    .text(function(d) {
      return d;
    })
    .attr('x', function(d, i) {
      return xScale(i) + xScale.rangeBand()/2;
    })
    .attr('y', function(d) {
      return yScale(d) + 14;
    });
  });
});