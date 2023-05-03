const width = window.innerWidth;
const height = window.innerHeight - 100;

const svg = d3.select('#circle_packing')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

d3.csv('./circle_packing.csv').then((data) => {
  data = data.filter((data) => data.region);
  const regions = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas'];
  const color = d3.scaleOrdinal()
    .domain(regions)
    .range(d3.schemeSet2);

  const size = d3.scaleLinear()
    .domain([0, 1400000000])
    .range([7, 150])

  d3.select('#circle_packing')
    .append('div')
    .attr('class', 'legend')
    .html(`${regions.map((region, idx) => 
      `<span class='legend_item' style='background-color: ${d3.schemeSet2[idx]};'>${region}</span>`
    ).join(' ')}`);

  const InfoPanel = d3.select('#circle_packing')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'info_panel')

  const mouseover = () => {
    InfoPanel
      .style('opacity', 1)
  }
  const mousemove = (event, d) => {
    InfoPanel
      .html(`<u>${d.key}</u><br />${d.value} habitants`)
      .style('left', (event.x - (event.x / 2)) + 'px')
      .style('top', (event.y - (event.y / 2)) + 'px')
  }
  const mouseleave = () => {
    InfoPanel
      .style('opacity', 0)
  }

  var node = svg.append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('class', 'node')
    .attr('r', (d) => size(d.value))
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', (d) => color(d.region))
    .style('fill-opacity', 0.8)
    .attr('stroke', 'black')
    .style('stroke-width', 1)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)

  const simulation = d3.forceSimulation()
    .force('center', d3.forceCenter().x(width / 2).y(height / 2))
    .force('charge', d3.forceManyBody().strength(1))
    .force('collide', d3.forceCollide().strength(.5).radius((d) => (size(d.value)+3)).iterations(1))

  simulation
    .nodes(data)
    .on('tick', (d) => {
      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    });
});