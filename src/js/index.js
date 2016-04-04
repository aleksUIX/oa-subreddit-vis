(function() {
  var margin = {top: 0, right: 30, bottom: 40, left: 30},
      width = 600 - margin.left - margin.right,
      height = 2000 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([0, height], 0.1);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(0)
      .tickPadding(6);

  var svg = d3.select(".chart-container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = d3.select('textarea').html();
  data = d3.csv.parse(data);
  data = data.map(function(d) {
    d.value = parseInt(d.value)
    return d;
  })

  x.domain(d3.extent(data, function(d) { return d.value; }));
  y.domain(data.map(function(d) { return d.name; }));

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand())
      .append('text')
      .text('asd')

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  var yAxis = svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);


  var groups = svg.append('g')

  groups.selectAll('text').data(data).enter().append('text')
      .classed('text-value', true)
      .text(function(d) { return d.value; })
      .attr({
        transform: function(d) {
          if (d.value > 0) {
            return 'translate(' + Math.abs(x(d.value) - 20) + ', '+ (y(d.name) + 12) +')';
          } else {
            return 'translate('+ (x(0) + 10) + ', '+ (y(d.name) + 12) +')';
          }
        }
      });

  function type(d) {
    d.value = +d.value;
    return d;
  }
})()
