$(function() {
  var dataset = [
      [
        { x: 0, y: 5 },
        { x: 1, y: 4 },
        { x: 2, y: 2 },
        { x: 3, y: 7 },
        { x: 4, y: 23 }
      ],
      [
        { x: 0, y: 10 },
        { x: 1, y: 12 },
        { x: 2, y: 19 },
        { x: 3, y: 23 },
        { x: 4, y: 17 }
      ],
      [
        { x: 0, y: 22 },
        { x: 1, y: 28 },
        { x: 2, y: 32 },
        { x: 3, y: 35 },
        { x: 4, y: 43 }
      ]
  ];
  var stack = d3.layout.stack();
  stack(dataset);
  var xScale = d3.scale.ordinal()
                  .domain([0, 1, 2, 3, 4])
                  .rangeBands([0, 300]);
  var yScale = d3.scale.linear()
                  .domain([0, 43])
                  .range([0, 100]);
  var color = d3.scale.category10();
  var svg = d3.select('body')
            .append('svg')
            .attr({
              'width': 300,
              'height': 300
            });
  var groups = svg.selectAll('g')
                  .data(dataset)
                  .enter()
                  .append('g')
                  .attr('fill', function(d, i) {
                    console.log(d, i);
                    return color(i);
                  });

  var rects = groups.selectAll('rect')
                    .data(function(d) { return d; })
                    .enter()
                    .append('rect')
                    .attr('x', function(d, i) {
                      return xScale(i);
                    })
                    .attr('y', function(d) {
                      return yScale(d.y0);
                    })
                    .attr('height', function(d) {
                      return yScale(d.y);
                    })
                    .attr('width', xScale.rangeBand());
});
