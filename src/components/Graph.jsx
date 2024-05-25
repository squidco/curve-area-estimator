import React, { useState } from "react";
import Plot from "react-plotly.js";
import { create, all } from "mathjs";

// All calculations will be made with fractions by default
const config = { number: "Fraction" };
const math = create(all, config);

export default function Graph({ equation, plotData }) {
  return (
    <Plot
      data={plotData}
      layout={{ width: 320, height: 320, title: equation }}
    />
  );
}
