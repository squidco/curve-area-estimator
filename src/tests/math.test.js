import estimates from "../utils/curveEstimator";
import { create, all } from "mathjs";
import { describe, expect, test } from "vitest";

const config = { number: "Fraction" };
const math = create(all, config);

describe("Refactored estimate function", () => {
  test("Even function", () => {
    const numberOfRectangles = "2";
    const domain = [-5, -1];
    const equation = "y=x^2";

    expect(
      estimates(equation, domain, numberOfRectangles)
    ).toStrictEqual({
      midPoint: math.fraction(40),
      lower: math.fraction(20),
      upper: math.fraction(68),
    });
  });
  test("Odd function", () => {
    const numberOfRectangles = "2";
    const domain = [-1, 0];
    const equation = "y=x";

    expect(
      estimates(equation, domain, numberOfRectangles)
    ).toStrictEqual({
      midPoint: math.fraction("1/2"),
      lower: math.fraction("1/4"),
      upper: math.fraction("3/4"),
    });
  });
});
