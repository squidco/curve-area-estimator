import { create, all } from "mathjs";

// All calculations will be made with fractions by default
const config = { number: "Fraction" };
const math = create(all, config);

function widthOfRectangles(domain, numberOfRectangles) {
  // Domain should come in this form: "[0,5]"
  const bounds = domain.slice(1, -1).split(",");
  const lowerBound = bounds[0];
  const upperBound = bounds[1];

  const widthFraction = math.evaluate(
    `(${upperBound} - ${lowerBound})/${numberOfRectangles}`
  );

  // Should always return a string fraction: "5/2"
  return math.format(widthFraction);
}

function lowerUpperDomains(domain, width) {
  // Domain should come in this form: "[0,5]"
  const bounds = domain.slice(1, -1).split(",");
  const lowerBound = math.fraction(bounds[0]);
  const upperBound = math.fraction(bounds[1]);

  const domainArray = [];
  let oldBound = lowerBound;
  let newBound;

  while (math.smaller(oldBound, upperBound)) {
    newBound = math.add(math.fraction(oldBound), math.fraction(width));
    const newDomain = [oldBound, newBound];
    domainArray.push(newDomain);
    oldBound = newBound;
  }

  return domainArray;
}

function midPointDomains(domains) {
  // Domains will come in this form: [[-5, -3],[-3,-1]]
  const midPoints = [];
  domains.forEach((array) => {
    const midPoint = math.evaluate(
      `(${math.fraction(array[1])} + ${math.fraction(array[0])})/2`
    );
    midPoints.push(midPoint);
  });
  return midPoints;
}

function lowerUpperEstimate(equation, domains, width) {
  // Remove repeat values
  const concat = new Set(domains.concat().flat());
  const rectangleAreas = [];
  const estimates = [];

  // Calculates rectangle areas
  concat.forEach((item) => {
    const area = math.evaluate(`${equation}*${width}`, { x: item });
    rectangleAreas.push(area);
  });

  // Sets up to give the upper and lower estimates
  let estimateOne = [...rectangleAreas];
  estimateOne.shift();
  let estimateTwo = [...rectangleAreas];
  estimateTwo.pop();

  // Calculates estimates then pushes them to estimates array

  estimateOne = estimateOne.reduce((acum, current) => {
    return math.add(acum, current);
  }, 0);

  estimateTwo = estimateTwo.reduce((acum, current) => {
    return math.add(acum, current);
  }, 0);

  // Sorting the values by lowest to highest
  // yes I know there is a .sort() on arrays but the values
  // are still in math.fractions() here so it won't work
  if (math.larger(estimateOne, estimateTwo)) {
    estimates.push(estimateTwo, estimateOne);
  } else {
    estimates.push(estimateOne, estimateTwo);
  }

  return estimates;
}

function midPointEstimate(equation, midPoints, width) {
  const rectangleAreas = [];

  midPoints.forEach((item) => {
    const area = math.evaluate(`${equation}*${width}`, { x: item });
    rectangleAreas.push(area);
  });

  return rectangleAreas.reduce((acum, current) => {
    return math.add(acum, current);
  }, 0);
}

function curveArea(equation, domain, numberOfRectangles) {
  const width = widthOfRectangles(domain, numberOfRectangles);
  const lowerUpperDoms = lowerUpperDomains(domain, width);
  const midPoints = midPointDomains(lowerUpperDoms);
  const lowerUpperEst = lowerUpperEstimate(equation, lowerUpperDoms, width);
  const midPointEst = midPointEstimate(equation, midPoints, width);

  const estimates = {
    lower: lowerUpperEst[0],
    upper: lowerUpperEst[1],
    midPoint: midPointEst,
  };

  return estimates;
}

export {
  widthOfRectangles,
  midPointDomains,
  midPointEstimate,
  lowerUpperDomains,
  lowerUpperEstimate,
  curveArea,
  estimates,
};

function estimates(equation, domain, numberOfRectangles) {
  // Bounds [-5,-1]
  const lowerBound = math.fraction(domain[0]);
  const upperBound = math.fraction(domain[1]);
  // Width and initial midpoint
  const width = math.evaluate(
    `(${upperBound} - ${lowerBound})/${numberOfRectangles}`
  );
  const initialMidPoint = math.evaluate(`${width}/2`);

  const lowerUpperAreas = [];
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
  console.log(lowerUpperAreas);
  const estimates = [];

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
  // yes I know there is a .sort() on arrays but the values
  // are still in math.fractions() here so it won't work
  if (math.larger(estimateOne, estimateTwo)) {
    estimates.push(estimateTwo, estimateOne);
  } else {
    estimates.push(estimateOne, estimateTwo);
  }

  console.log({
    midPoint: midPointEst,
    lower: estimates[0],
    upper: estimates[1],
  });
  return { midPoint: midPointEst, lower: estimates[0], upper: estimates[1] };
}

estimates("y=x^2", [-5, -1], "2");
