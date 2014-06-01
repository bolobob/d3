$(function() {
  var dataset = [];
  for (var i = 0; i < 25; i++) {
    var newNumber = Math.floor(Math.random() * 30);
    dataset.push(newNumber);
  }
  // d3.select('body')
  // .append('p')
  // .text('New paragraph!');

  // d3.csv('food.csv', function(error, data) {
  //   if (error === null) {
  //     dataset = data;
  //     d3.select('body').selectAll('p')
  //     .data(dataset)
  //     .enter()
  //     .append('p')
  //     .text(function(d) {
  //       return d.Food;
  //     })
  //     .style('color', 'red');
  //   } else {
  //     console.log(error);
  //   }
  // });

  // d3.select('body').selectAll('p')
  // //d3.selectAll('p')
  // .data([5, 10, 15, 20, 25])
  // .enter()
  // .append('p')
  // .text(function(d) {
  //   return 'I can count up to ' + d;
  // })
  // .style('color', function(d) {
  //   if (d > 15) {
  //     return 'red';
  //   } else {
  //     return 'black';
  //   }
  // });

  // d3.select('body').selectAll('div')
  // .data(dataset)
  // .enter()
  // .append('div')
  // .classed('bar', true)
  // .style('height', function(d) {
  //   return (d * 5) + 'px';
  // });

  var w = 500, h = 50;
  dataset = [5, 10, 15, 20, 25];
  var svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
  var circles = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle');

  circles.attr('cx', function(d, i) {
    return (i * 50) + 25;
  })
  .attr('cy', h / 2)
  .attr('r', function(d) {
    return d;
  })
  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', function(d) {
    return d/2;
  });

  var barPadding = 1;
  h = 100;
  dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
  var svg2 = d3.select('body').append('svg').attr('width', w).attr('height', h);
  svg2.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr({
    'x': function(d, i) {
      return i * (w / dataset.length);
    },
    'y': function(d) {
      return h - d * 4;
    }
  })
  .attr('width', function(d) {
    return w / dataset.length - barPadding;
  })
  .attr('height', function(d) {
    return d * 4;
  })
  .attr('fill', function(d) {
    return 'rgb(0, ' + (d * 10) + ', 0)';
  });

  svg2.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d) {
    return d;
  })
  .attr('x', function(d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  })
  .attr('y', function(d) {
    return h - (d * 4) + 14;
  })
  .attr({
    'font-family': 'sans-serif',
    'font-size': '11px',
    'fill': 'white',
    'text-anchor': 'middle'
  });

  dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
  ];
  var svg3 = d3.select('body').append('svg').attr({width: w, height: h});
  svg3.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr({
    'cx': function(d) {
      return d[0];
    },
    'cy': function(d) {
      return d[1];
    },
    'r': function(d) {
      return Math.sqrt(h - d[1]);
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
      return d[0];
    },
    'y': function(d) {
      return d[1];
    },
    'font-family': 'sans-serif',
    'font-size': '11px',
    'fill': 'red'
  });
});
