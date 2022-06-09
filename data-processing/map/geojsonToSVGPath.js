
const fs = require("fs");

const GeoJson = JSON.parse(fs.readFileSync("./sunset.json", "utf-8"));

const stripLabelsNorth = JSON.parse(fs.readFileSync("./strip_labels_n.json", "utf-8"));

const stripLabelsSouth = JSON.parse(fs.readFileSync("./strip_labels_s.json", "utf-8"));


const stripLabels = stripLabelsNorth.map(sl => ({
  ...sl,
  direction: 'n'
})).concat(stripLabelsSouth.map(sl => ({
  ...sl,
  direction: 's',
})));

const maxCoordinate = Math.max(...stripLabels.map(d => d.coordinate));





const points = GeoJson.geometry.coordinates[0];

const lineSegments = points
  .slice(1)
  .map((point) => `L ${point[0]} ${point[1] * -1}`);

const path = `M ${points[0][0]} ${points[0][1] * -1} ${lineSegments.join(" ")}`;

const getDistanceBetweenPoints = (point1, point2) => Math.sqrt((point1[0] - point2[0]) * (point1[0] - point2[0]) + (point1[1] - point2[1]) * (point1[1] - point2[1]));

let totalDistance = 0;
points.forEach((point, idx) => {
  if (points[idx + 1]) {
    totalDistance += getDistanceBetweenPoints(point, points[idx + 1]);
  }
});

const calcRotation = (point) => {
  const idx = points.findIndex(_point => _point[0] === point[0] && _point[1] === point[1]);
  return Math.atan2(points[Math.min(points.length -1, idx + 1)][0] - points[Math.max(0, idx - 1)][0], points[Math.min(points.length -1, idx + 1)][1] - points[Math.max(0, idx - 1)][1]) * 180/Math.PI ;
}

// this should use map, but this is elegant enough for a utility function that only has to be run once
const pointsDistanceAlongPath = [];
let runningDistance = 0;
points.forEach((point, idx) => {
  if (idx === points.length - 1) {
    runningDistance = totalDistance;
  } else if (idx !== 0) {
    runningDistance += getDistanceBetweenPoints(points[idx -1], point);
  }
  pointsDistanceAlongPath.push({
    point,
    runningDistance,
    percent: runningDistance / totalDistance,
    rotation: calcRotation(point),
  });
});

// adapted from https://stackoverflow.com/questions/33907276/calculate-point-between-two-coordinates-based-on-a-percentage
const midPoint = (point1, point2, per) => [point1[0] + (point2[0] - point1[0]) * per, point1[1] + (point2[1] - point1[1]) * per];

const coordinateToPoint = (coordinate) => {
  // find the point it's on or points it's between
  const percentAlongPath =  coordinate / maxCoordinate;
  const pointsBelow = pointsDistanceAlongPath
    .sort((a, b) => a.percent - b.percent)
    .filter(d => d.percent <= percentAlongPath);
  const pointBelow = (pointsBelow.length > 0) ? pointsBelow[pointsBelow.length -1] : null;
  const pointsAbove = pointsDistanceAlongPath
    .sort((a, b) => a.percent - b.percent)
    .filter(d => d.percent >= percentAlongPath);
  const pointAbove = pointsAbove[0];
  
  // figure out how close the coordinate is to each of the points
  const point = midPoint(pointBelow.point, pointAbove.point, (percentAlongPath - pointBelow.percent) * (pointAbove.percent - pointBelow.percent));
  return point; 
}

const coordinateRotation = (coordinate) => {
  // find the point it's on or points it's between
  const percentAlongPath = coordinate / maxCoordinate;
  const pointsBelow = pointsDistanceAlongPath
    .sort((a, b) => a.percent - b.percent)
    .filter(d => d.percent <= percentAlongPath);
  const pointBelow = (pointsBelow.length > 0) ? pointsBelow[pointsBelow.length -1] : null;
  const pointsAbove = pointsDistanceAlongPath
    .sort((a, b) => a.percent - b.percent)
    .filter(d => d.percent >= percentAlongPath);
  const pointAbove = pointsAbove[0];
  
  // figure out how close the coordinate is to each of the points
  const rotation = pointBelow.rotation + (pointAbove.rotation - pointBelow.rotation) * (percentAlongPath - pointBelow.percent) * (pointAbove.percent - pointBelow.percent)
  return rotation; 
}


const stripLabelsWithLatLngs = stripLabels.map(d => {
  const [ lng, lat ] = coordinateToPoint(d.coordinate);
  const rotation90 = coordinateRotation(d.coordinate) - 90;
  const nPoint = [Math.cos(rotation90 * Math.PI/180) * 0.002 + lng, Math.sin(rotation90 * Math.PI/180) * 0.002 + lat];
  const sPoint = [Math.cos((rotation90 + 180) * Math.PI/180) * 0.002 + lng, Math.sin((rotation90 + 180) * Math.PI/180) * 0.002 + lat];
  return {
    id: d.id,
    l: d.label,
    c: d.coordinate,
    s: d.direction,
    h: false,
    lat,
    lng,
    r: coordinateRotation(d.coordinate),
    // nPoint,
    // sPoint,
  };
});

console.log(JSON.stringify(stripLabelsWithLatLngs));

// const svg = `
// <svg
//   width='1000'
//   height='500'
//   xmlns="http://www.w3.org/2000/svg"
// >
// <rect
//   x='0'
//   y='0'
//   width='1000'
//   height='500'
//   fill='silver'
// />
// <circle
// cx='-118.3923'
// cy='34.05'
// r='0.2'
// fill='purple'
// />
//   <g transform='scale(5000) translate(118.399, 34.11) rotate(-10 -118.31 -34.0855) '>
//     <circle
//       cx='-118.3923'
//       cy='-34.09'
//       r='1'
//       fill='green'
//     />
//     <circle
//       cx='-118.38367800120484'
//       cy='-34.090642999293891'
//       r='1'
//       fill='silver'
//     />
//     <circle
//       cx='-118.233'
//       cy='-34.057'
//       r='0.0001'
//       fill='red'
//     />
//     <path d='${path}' 
//       fill='transparent'
//       stroke='grey'
//       stroke-width='0.0008'
//     />
//     <path d='${path}' 
//       fill='transparent'
//       stroke='silver'
//       stroke-width='0.0004'
//     />

//     ${stripLabelsWithLatLngs
//       .filter((d, idx) => idx % 10 === 0)
//       .map((d, idx) => {
//         return (
//           `<circle
//             cx='${d.nPoint[1]}'
//             cy='-${d.nPoint[0]}'
//             r='0.001'
//             fill='red'
//           />
//           <circle
//             cx='${d.sPoint[1]}'
//             cy='-${d.sPoint[0]}'
//             r='0.001'
//             fill='blue'
//           />`
//         );
//       })
//     })}
//   </g>
// </svg>
// `;

//fs.writeFileSync("./map.svg", svg);
