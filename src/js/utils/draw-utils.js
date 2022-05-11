import { fillArray } from "./helpers";

export function getBarHeightAndYAttr(yTop, zeroLine) {
  let height, y;
  if (yTop <= zeroLine) {
    height = zeroLine - yTop;
    y = yTop;
  } else {
    height = yTop - zeroLine;
    y = zeroLine;
  }

  return [height, y];
}

export function equilizeNoOfElements(
  array1,
  array2,
  extraCount = array2.length - array1.length
) {
  // Doesn't work if either has zero elements.
  if (extraCount > 0) {
    array1 = fillArray(array1, extraCount);
  } else {
    array2 = fillArray(array2, extraCount);
  }
  return [array1, array2];
}

export function truncateString(txt, len) {
  if (!txt) {
    return;
  }
  if (txt.length > len) {
    return txt.slice(0, len - 3) + "...";
  } else {
    return txt;
  }
}

export function shortenLargeNumber(label) {
  let number;
  if (typeof label === "number") number = label;
  else if (typeof label === "string") {
    number = Number(label);
    if (Number.isNaN(number)) return label;
  }

  // Using absolute since log wont work for negative numbers
  const p = Math.floor(Math.log10(Math.abs(number)));
  if (p <= 2) return number; // Return as is for a 3 digit number of less
  const l = Math.floor(p / 3);
  const shortened =
    Math.pow(10, p - l * 3) * +(number / Math.pow(10, p)).toFixed(1);

  // Correct for floating point error upto 2 decimal places
  return Math.round(shortened * 100) / 100 + " " + ["", "K", "M", "B", "T"][l];
}

// cubic bezier curve calculation (from example by François Romain)
export function getSplineCurvePointsStr(xList, yList) {
  const points = [];
  for (let i = 0; i < xList.length; i++) {
    points.push([xList[i], yList[i]]);
  }

  const smoothing = 0.2;
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  };

  const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current;
    const n = next || current;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  };

  const bezierCommand = (point, i, a) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point);
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  };

  const pointStr = (points, command) => {
    return points.reduce(
      (acc, point, i, a) =>
        i === 0 ? `${point[0]},${point[1]}` : `${acc} ${command(point, i, a)}`,
      ""
    );
  };

  return pointStr(points, bezierCommand);
}
