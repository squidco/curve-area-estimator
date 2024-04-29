import { create, all } from "mathjs";

// All calculations will be made with fractions by default
const config = { number: "Fraction" };
const math = create(all, config);

function estimates(equation, domain, numberOfRectangles) {
  // Bounds ex. "[-5,-1]"
  const bounds = domain.replace(/ /g, "").slice(1, -1).split(",");
  const lowerBound = math.fraction(bounds[0]);
  const upperBound = math.fraction(bounds[1]);

  // Width and initial midpoint
  const width = math.evaluate(
    `(${upperBound} - ${lowerBound})/${numberOfRectangles}`
  );
  const initialMidPoint = math.evaluate(`${width}/2`);

  const lowerUpperAreas = [];
  const estimates = [];
  let midPointEst = math.fraction(0);

  // Upper and lower estimation
  for (
    let index = lowerBound;
    math.smallerEq(index, upperBound);
    index = math.add(index, width)
  ) {
    // Gets the absolute value of width * height because areas can't be negative
    const area = math.abs(
      math.evaluate(`${width}*(${equation})`, { x: index })
    );
    lowerUpperAreas.push(area);
  }
  // Midpoint estimation
  for (
    let index = math.add(lowerBound, initialMidPoint);
    math.smaller(index, upperBound);
    index = math.add(index, width)
  ) {
    // Gets the absolute value of width * height because areas can't be negative
    const area = math.abs(
      math.evaluate(`${width}*(${equation})`, { x: index })
    );
    midPointEst = math.add(midPointEst, area);
  }

  let estimateOne = [...lowerUpperAreas];
  estimateOne.shift();
  let estimateTwo = [...lowerUpperAreas];
  estimateTwo.pop();

  // Calculates estimates then pushes them to estimates array
  estimateOne = estimateOne.reduce((acum, current) => {
    return math.add(acum, current);
  }, 0);

  estimateTwo = estimateTwo.reduce((acum, current) => {
    return math.add(acum, current);
  }, 0);

  // Sorting the values by lowest to highest
  if (math.larger(estimateOne, estimateTwo)) {
    estimates.push(estimateTwo, estimateOne);
  } else {
    estimates.push(estimateOne, estimateTwo);
  }
  return {
    midPoint: math.format(midPointEst),
    lower: math.format(estimates[0]),
    upper: math.format(estimates[1]),
  };
}

export default estimates;
