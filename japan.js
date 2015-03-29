var w = 1000;
var h = 1000;

// SVG要素生成
var svg = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h);
d3.json("japan.topojson", function(json) {
  var japan = topojson.object(json, json.objects.japan).geometries;
  console.log(japan);
});
