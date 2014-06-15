$(function() {
  var parseDate = d3.time.format('%Y-%m-%d').parse;
  d3.select('#Ymd').html(parseDate('2014-06-14'));

  var parseDate = d3.time.format('%Y-%m').parse;
  d3.select('#Ym').html(parseDate('2014-06'));
});
