const percToDeg = (perc) => perc * 360;
const percToRad = (perc) => degToRad(percToDeg(perc));
const degToRad = (deg) => deg * Math.PI / 180;

const percent = .65;
const barWidth = 40;
const sections = 3;

const sectionPercentage = 1 / sections / 2;
const padRad = 0.05;
const chartInset = 10;

let totalPercent = .75;

const element = d3.select('#gauge');

const margins = {
  top: 0,
  right: 0,
  bottom: 30,
  left: 0
};

const width = window.innerWidth / 2
const height = window.innerHeight / 1.5;
const radius = Math.min(width, height) / 4;

const svg = element.append('svg').attr('width', width + margins.left + margins.right).attr('height', height + margins.top + margins.bottom);
const chart = svg.append('g').attr('transform', `translate(${(width + margins.left) / 2}, ${(height + margins.top) / 2})`);

for (sectionIndx = i = 1, ref = sections; (1 <= ref ? i <= ref : i >= ref); sectionIndx = 1 <= ref ? ++i : --i) {
  arcStartRad = percToRad(totalPercent);
  arcEndRad = arcStartRad + percToRad(sectionPercentage);
  totalPercent += sectionPercentage;
  startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
  endPadRad = sectionIndx === sections ? 0 : padRad / 2;
  arc = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth).startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);
  chart.append('path').attr('class', `arc chart-color${sectionIndx}`).attr('d', arc);
}

class Needle {
  constructor(len, radius1) {
    this.len = len;
    this.radius = radius1;
  }

  drawOn(el, perc) {
    el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
    return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc));
  }

  animateOn(el, perc) {
    const self = this;
    return el.transition().delay(500).ease('elastic').duration(3000).selectAll('.needle').tween('progress', function() {
      return function(percentOfPercent) {
        const progress = percentOfPercent * perc;
        return d3.select(this).attr('d', self.mkCmd(progress));
      };
    });
  }

  mkCmd(perc) {
    const thetaRad = percToRad(perc / 2);
    const centerX = 0;
    const centerY = 0;
    const topX = centerX - this.len * Math.cos(thetaRad);
    const topY = centerY - this.len * Math.sin(thetaRad);
    const leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
    const leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
    const rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
    const rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
    return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`;
  }

};

needle = new Needle(90, 15);

needle.drawOn(chart, 0);

needle.animateOn(chart, percent);