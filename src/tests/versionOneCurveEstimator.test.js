import * as estimate from "../utils/versionOneCurveEstimator.js";
import { create, all } from "mathjs";
import { describe, expect, test } from "vitest";

const config = { number: "Fraction" };
const math = create(all, config);

describe("Width of Rectangles", () => {
  test("Calculates rectangle widths", () => {
    const numberOfRectangles = "2";
    const domain = "[0,5]";

    expect(estimate.widthOfRectangles(domain, numberOfRectangles)).toBe("5/2");
  });

  test("Calculates rectangle width with negative numbers", () => {
    const numberOfRectangles = "2";
    const domain = "[-5,-1]";

    expect(estimate.widthOfRectangles(domain, numberOfRectangles)).toBe("2/1");
  });

  test("Calculates rectangle width with fractions", () => {
    const numberOfRectangles = "2";
    const domain = "[1/5,1]";

    expect(estimate.widthOfRectangles(domain, numberOfRectangles)).toBe("2/5");
  });
});

describe("Domains of Rectangles", () => {
  const numberOfRectangles = "2";
  const domain = "[-5,-1]";
  test("Given the length of a rectangle, find the domains for upper and lower rectangles", () => {
    const width = estimate.widthOfRectangles(domain, numberOfRectangles);

    expect(estimate.lowerUpperDomains(domain, width)).toStrictEqual([
      [math.fraction(-5), math.fraction(-3)],
      [math.fraction(-3), math.fraction(-1)],
    ]);
  });
  test("Given rectangle domains find the midpoints of each domain", () => {
    const width = estimate.widthOfRectangles(domain, numberOfRectangles);
    const domains = estimate.lowerUpperDomains(domain, width);

    expect(estimate.midPointDomains(domains)).toStrictEqual([
      math.fraction(-4),
      math.fraction(-2),
    ]);
  });
});

describe("Find upper/lower and midpoint estimates", () => {
  const numberOfRectangles = "2";
  const domain = "[-5,-1]";
  const equation = "y=x^2";

  const width = estimate.widthOfRectangles(domain, numberOfRectangles);
  const domains = estimate.lowerUpperDomains(domain, width);
  const midPoints = estimate.midPointDomains(domains);

  test("Find the lower and upper estimated area under a function down to the X-axis", () => {
    expect(estimate.lowerUpperEstimate(equation, domains, width)).toStrictEqual(
      [math.fraction(20), math.fraction(68)]
    );
  });
  test("Find the midpoint estimate", () => {
    expect(estimate.midPointEstimate(equation, midPoints, width)).toStrictEqual(
      math.fraction(40)
    );
  });
});

describe("Curve Area Estimation function", () => {
  const numberOfRectangles = "2";
  const domain = "[-5,-1]";
  const equation = "y=x^2";
  test("Return lower, upper, and midpoint estimates", () => {
    expect(
      estimate.curveArea(equation, domain, numberOfRectangles)
    ).toStrictEqual({
      lower: math.fraction(20),
      upper: math.fraction(68),
      midPoint: math.fraction(40),
    });
  });
});
