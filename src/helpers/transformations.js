const dilate = (originalCoordinate, newCoordinate, fixedCoordinate, margin) => {
  const crossedFixed =
    (originalCoordinate - fixedCoordinate) * (newCoordinate - fixedCoordinate) <
    0;
  const direction = newCoordinate < fixedCoordinate ? -1 : 1;
  const outOfBounds = newCoordinate < 0;
  const largeEnough = Math.abs(newCoordinate - fixedCoordinate) > margin;

  if (crossedFixed || !largeEnough) {
    return { start: fixedCoordinate, length: margin * 2 };
  }
  if (outOfBounds) {
    return { start: 0, length: fixedCoordinate };
  }

  return direction > 0
    ? {
        start: fixedCoordinate,
        length: Math.abs(newCoordinate - fixedCoordinate),
      }
    : {
        start: newCoordinate,
        length: Math.abs(newCoordinate - fixedCoordinate),
      };
};

const move = ({ bounds, point, offset }) => {
  const newX = point.x - offset.x;
  const newY = point.y - offset.y;
  const outOfBounds = point.x < 0 || point.y < 0;
  if (outOfBounds) {
    return bounds;
  }
  return { left: newX, top: newY };
};

const composeTransformations = transformations => (bounds, point, margin) =>
  transformations.reduce(
    (acc, currentTransformation) => {
      const transformation = currentTransformation(bounds, point, margin);
      return { ...acc, ...transformation };
    },
    { ...bounds },
  );

const dilateE = ({ bounds, point, margin }) => {
  const { left, width } = bounds;
  const dilation = dilate(left + width, point.x, left, margin);
  return { width: dilation.length };
};

const dilateW = ({ bounds, point, margin }) => {
  const { left, width } = bounds;
  const dilation = dilate(left, point.x, left + width, margin);
  return { left: dilation.start, width: dilation.length };
};

const dilateN = ({ bounds, point, margin }) => {
  const { top, height } = bounds;
  const dilation = dilate(top, point.y, top + height, margin);
  return { top: dilation.start, height: dilation.length };
};

const dilateS = ({ bounds, point, margin }) => {
  const { top, height } = bounds;
  const dilation = dilate(top + height, point.y, top, margin);
  return { height: dilation.length };
};

const dilateNE = composeTransformations([dilateN, dilateE]);
const dilateSW = composeTransformations([dilateS, dilateW]);
const dilateSE = composeTransformations([dilateS, dilateE]);
const dilateNW = composeTransformations([dilateN, dilateW]);

const transformations = {
  dilateE,
  dilateW,
  dilateN,
  dilateS,
  dilateNE,
  dilateSW,
  dilateSE,
  dilateNW,
  move,
};

export default transformations;
