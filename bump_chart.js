d3.json("./bump_chart.json", function (events) {
  var chart = d3.bumpsChart()
    .year(2008)
    .numYearsToView(5)
    .windowWidth(window.document.body.clientWidth)
    .on("selectYear", (start, end) => console.log(start + '-' + end))
    .on("highlightCrew", crew => console.log(crew))
    .on("toggleSelectedCrew", crew => console.log(crew));

    var genderMenu = d3.select("#gender")
    .on("change", change);

  genderMenu.selectAll("option")
    .data(Object.values(d3.GENDER))
    .enter().append("option")
    .text(d => d)
    .attr('value', d => d);

  genderMenu.property("value", d3.GENDER.MEN);

  var setMenu = d3.select("#set")
    .on("change", change);

  setMenu.selectAll("option")
    .data(Object.values(d3.SET))
    .enter().append("option")
    .text(d => d)
    .attr('value', d => d);

  setMenu.property("value", d3.SET.TORPIDS);

  function change() {
    draw();
  }

  draw();

  function draw() {
    var gender = d3.GENDER.WOMEN;
    var set = d3.SET.TORPIDS;
    var el = document.getElementById('bump_chart');

    var transformedEvents = events
      .filter(e => e.gender.toLowerCase() === gender.toLowerCase())
      .filter(e => e.set === set)
      .sort((a, b) => a.year - b.year)
      .map(event => d3.transformData(event));

    var data = d3.joinEvents(transformedEvents, set, gender);

    d3.select(el).datum(data).call(chart);
  }
});
