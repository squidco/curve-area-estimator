import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function Graph({ plotData, showGraph }) {
  return (
    <Plot
      data={plotData}
      layout={{
        xaxis: { color: "#fff", gridcolor: "#949494" },
        yaxis: { color: "#fff", gridcolor: "#949494" },
        font: { color: "#fff" },
        width: 400,
        height: 420,
        paper_bgcolor: "#000000",
        plot_bgcolor: "#000000",
        transition: {
          duration: 300,
          easing: "sin-in-out",
          ordering: "traces first",
        },
        modebar: {
          orientation: "h",
          remove: ["lasso2d", "toImage", "autoScale2d", "pan2d"],
        },
        dragmode: "pan",
      }}
    />
  );
}
