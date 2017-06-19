/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  padding = 20
paddingLeft = 40

const yScale = d3.scaleLinear()
.domain([0, 4])
.range([0, height])

const xScale = d3.scaleLinear()
.domain([0, 46])
.range([0, width])

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('padding', padding)
  .style('padding-left', paddingLeft)

// redraw function
let redraw = (data) => {
  var Goal = []
  data.forEach((d) => Goal.push(+d.GoalsScored))

  const colorScale = d3.scaleLinear().domain([0,4]).range(['rgb(255, 165, 0)', 'red'])

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return xScale(i) + 3
  })
  .attr('y', (d) => {
    return height - yScale(d.GoalsScored)
  })
  .attr('width', 13)
  .attr('height', (d) => {
    return yScale(d.GoalsScored)
  })
  .attr('fill', 'teal')
  .on('mouseover', function(d,i){
    d3.select(this).style('fill', 'green')
  })
  .on('mouseout', function(d,i) {
    d3.select(this).style('fill', 'teal')
  })

   // Create scale
   var scaleX = d3.scaleLinear()
   .domain([0, 46])
   .range([0, width]);

   var scaleY = d3.scaleLinear()
   .domain([4, 0])
   .range([0, height]);

   // Add scales to axis
   var x_axis = d3.axisBottom()
  .scale(scaleX)
  .ticks(46)

  var y_axis = d3.axisLeft()
  .scale(scaleY)
  .ticks(4)

   //Append group and insert axis
   svg.append("g")
  .attr("transform", "translate(0, 300)")
  .call(x_axis);

  svg.append("g")
  .attr("transform", "translate(0, 0 )")
  .call(y_axis);


}

// Data reloading
let reload = () => {
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })
}


reload()
