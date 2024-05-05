import estimates from "../utils/curveEstimator";
import { create, all } from "mathjs";
import { describe, expect, test } from "vitest";

const config = { number: "Fraction" };
const math = create(all, config);

describe("Refactored estimate function", () => {
  test("Even function", () => {
    const numberOfRectangles = "2";
    const domain = "[-5,-1]";
    const equation = "y=x^2";

    expect(estimates(equation, domain, numberOfRectangles)).toStrictEqual({
      midPoint: "40/1",
      lower: "20/1",
      upper: "68/1",
    });
  });
  test("Odd function", () => {
    const numberOfRectangles = "2";
    const domain = "[-1,0]";
    const equation = "y=x";

    expect(estimates(equation, domain, numberOfRectangles)).toStrictEqual({
      midPoint: "1/2",
      lower: "1/4",
      upper: "3/4",
    });
  });
  test("Fractional domains", () => {
    const numberOfRectangles = "2";
    const domain = "[1/9,1]";
    const equation = "4/x"

    expect(estimates(equation, domain, numberOfRectangles)).toStrictEqual({
      midPoint:"160/21",
      lower: "224/45",
      upper: "96/5"
    })
  });
});
