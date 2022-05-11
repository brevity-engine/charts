import { getBarHeightAndYAttr, getSplineCurvePointsStr } from "./draw-utils";

export const UNIT_ANIM_DUR = 350;
export const PATH_ANIM_DUR = 350;
export const MARKER_LINE_ANIM_DUR = UNIT_ANIM_DUR;
export const REPLACE_ALL_NEW_DUR = 250;

export const STD_EASING = "easein";

export function translate(unit, oldCoord, newCoord, duration) {
  const old = typeof oldCoord === "string" ? oldCoord : oldCoord.join(", ");
  return [
    unit,
    { transform: newCoord.join(", ") },
    duration,
    STD_EASING,
    "translate",
    { transform: old },
  ];
}

export function translateVertLine(xLine, newX, oldX) {
  return translate(xLine, [oldX, 0], [newX, 0], MARKER_LINE_ANIM_DUR);
}

export function translateHoriLine(yLine, newY, oldY) {
  return translate(yLine, [0, oldY], [0, newY], MARKER_LINE_ANIM_DUR);
}

export function animateRegion(rectGroup, newY1, newY2, oldY2) {
  const newHeight = newY1 - newY2;
  const rect = rectGroup.childNodes[0];
  const width = rect.getAttribute("width");
  const rectAnim = [
    rect,
    { height: newHeight, "stroke-dasharray": `${width}, ${newHeight}` },
    MARKER_LINE_ANIM_DUR,
    STD_EASING,
  ];

  const groupAnim = translate(
    rectGroup,
    [0, oldY2],
    [0, newY2],
    MARKER_LINE_ANIM_DUR
  );
  return [rectAnim, groupAnim];
}

export function animateBar(bar, x, yTop, width, offset = 0, meta = {}) {
  let [height, y] = getBarHeightAndYAttr(yTop, meta.zeroLine);
  y -= offset;
  if (bar.nodeName !== "rect") {
    const rect = bar.childNodes[0];
    const rectAnim = [rect, { width, height }, UNIT_ANIM_DUR, STD_EASING];

    const oldCoordStr = bar
      .getAttribute("transform")
      .split("(")[1]
      .slice(0, -1);
    const groupAnim = translate(bar, oldCoordStr, [x, y], MARKER_LINE_ANIM_DUR);
    return [rectAnim, groupAnim];
  } else {
    return [[bar, { width, height, x, y }, UNIT_ANIM_DUR, STD_EASING]];
  }
  // bar.animate({height: args.newHeight, y: yTop}, UNIT_ANIM_DUR, mina.easein);
}

export function animateDot(dot, x, y) {
  if (dot.nodeName !== "circle") {
    const oldCoordStr = dot
      .getAttribute("transform")
      .split("(")[1]
      .slice(0, -1);
    const groupAnim = translate(dot, oldCoordStr, [x, y], MARKER_LINE_ANIM_DUR);
    return [groupAnim];
  } else {
    return [[dot, { cx: x, cy: y }, UNIT_ANIM_DUR, STD_EASING]];
  }
  // dot.animate({cy: yTop}, UNIT_ANIM_DUR, mina.easein);
}

export function animatePath(paths, newXList, newYList, zeroLine, spline) {
  const pathComponents = [];
  let pointsStr = newYList.map((y, i) => newXList[i] + "," + y).join("L");

  if (spline) {
    pointsStr = getSplineCurvePointsStr(newXList, newYList);
  }

  const animPath = [
    paths.path,
    { d: "M" + pointsStr },
    PATH_ANIM_DUR,
    STD_EASING,
  ];
  pathComponents.push(animPath);

  if (paths.region) {
    const regStartPt = `${newXList[0]},${zeroLine}L`;
    const regEndPt = `L${newXList.slice(-1)[0]}, ${zeroLine}`;

    const animRegion = [
      paths.region,
      { d: "M" + regStartPt + pointsStr + regEndPt },
      PATH_ANIM_DUR,
      STD_EASING,
    ];
    pathComponents.push(animRegion);
  }

  return pathComponents;
}

export function animatePathStr(oldPath, pathStr) {
  return [oldPath, { d: pathStr }, UNIT_ANIM_DUR, STD_EASING];
}
