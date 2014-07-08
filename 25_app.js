$(function() {
  //Width and height
  var w = 600;
  var h = 250;
  var dataset = [ { key: 0, value: 5 },
                  { key: 1, value: 10 },
                  { key: 2, value: 13 },
                  { key: 3, value: 19 },
                  { key: 4, value: 21 },
                  { key: 5, value: 25 },
                  { key: 6, value: 22 },
                  { key: 7, value: 18 },
                  { key: 8, value: 15 },
                  { key: 9, value: 13 },
                  { key: 10, value: 11 },
                  { key: 11, value: 12 },
                  { key: 12, value: 15 },
                  { key: 13, value: 20 },
                  { key: 14, value: 18 },
                  { key: 15, value: 17 },
                  { key: 16, value: 16 },
                  { key: 17, value: 18 },
                  { key: 18, value: 23 },
                  { key: 19, value: 25 } ];
  var key = function(d) {
    return d.key;
  };
  var maxValue = d3.max(dataset, function(d) {
                             return d.value;
                           });
  var xScale = d3.scale.ordinal()
               .domain(d3.range(dataset.length))
               .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
               .domain([0, maxValue])
               .range([0, h]);

  //Create SVG element
  var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

  //Create g(roup)
  var groups = svg.selectAll('.bar')
               .data(dataset)
               .enter()
               .append('g')
               .attr({'class': 'bar'});

  groups
  .append("rect")
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return h - yScale(maxValue);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", function(d) {
    return yScale(maxValue);
  })
  .attr('fill', 'none')
  .on('mouseover', function(d) {
    d3.select(this)
    .transition()
    .duration(250)
    .attr({'fill': 'orange'});
  })
  .on('mouseout', function(d) {
    d3.select(this).attr({'fill': "rgb(0, 0, " + (d.value * 10) + ")"});
  });

  //Create bars
  groups
  .append("rect")
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return h - yScale(d.value);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", function(d) {
    return yScale(d.value);
  })
  .attr("fill", function(d) {
    return "rgb(0, 0, " + (d.value * 10) + ")";
  })

  //Create labels
  groups
  .append("text")
  .text(function(d) {
    return d.value;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function(d) {
    return h - yScale(d.value) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

  //On click, update with new data
  d3.select("p").on("click", function() {
    dataset.shift();
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, maxValue]);

    var bars = svg.selectAll('rect')
               .data(dataset, key);
    bars.exit()
    .transition()
    .duration(1000)
    .attr('x', -xScale.rangeBand())
    .remove();

    bars.transition()
    .duration(1000)
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return h - yScale(d.value);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
      return yScale(d.value);
    });

    var texts = svg.selectAll("text")
                .data(dataset, key);

    texts.exit()
    .transition()
    .duration(1000)
    .attr("x", -xScale.rangeBand())
    .remove();

    texts.transition()
    .duration(1000)
    .text(function(d) {
      return d.value;
    })
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
      return h - yScale(d.value) + 14;
    });

  });
});
