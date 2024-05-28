import "./App.css";
import { useState } from "react";
import { estimates, getPlotValues } from "./utils/curveEstimator";
import TextInput from "./components/TextInput";
import Card from "./components/Card";
import Graph from "./components/Graph";

function App() {
  const [results, setResults] = useState({
    lower: "",
    upper: "",
    midPoint: "",
  });

  const [userInput, setUserInput] = useState({
    equation: "",
    domain: "",
    numberOfRectangles: "",
  });

  const [plotData, setPlotData] = useState([
    {
      x: [],
      y: [],
      type: "scatter",
      mode: "lines+markers",
      markers: { color: "red" },
    },
  ]);

  const [showGraph, setShowGraph] = useState(false);

  function onChange(e) {
    const target = e.target;
    setUserInput({ ...userInput, [target.name]: target.value });
  }

  function onSubmit() {
    const estimatedArea = estimates(
      userInput.equation,
      userInput.domain,
      userInput.numberOfRectangles
    );
    const plotValues = getPlotValues(
      userInput.equation,
      userInput.domain,
      userInput.numberOfRectangles
    );
    setPlotData([{ ...plotData, x: plotValues.x, y: plotValues.y }]);
    setResults(estimatedArea);
    setShowGraph(true);
  }

  return (
    <div className="min-h-screen p-8 flex flex-col mx-auto justify-between text-center transition-all">
      <div className="text-black">You're not supposed to see this...</div>
      <div>
        <h1 className="font-bold">Curve Area Estimator</h1>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center content-center">
            <TextInput
              id={"function"}
              label={"Function"}
              placeholder={"y=mx+b"}
              value={userInput.equation}
              onChange={onChange}
              name={"equation"}
            />
            <TextInput
              id={"domain"}
              label={"Domain"}
              placeholder={"[0,5]"}
              value={userInput.domain}
              onChange={onChange}
              name={"domain"}
            />
            <TextInput
              id={"rectangles"}
              label={"Number of Rectangles"}
              placeholder={"4"}
              value={userInput.numberOfRectangles}
              onChange={onChange}
              name={"numberOfRectangles"}
            />
            <button className="w-fit self-center" onClick={onSubmit}>
              Estimate
            </button>
          </div>
          <Graph plotData={plotData} showGraph={showGraph} />
        </div>
        <div className="flex justify-center">
          <Card className={"p-1 m-1"} title={"Upper Estimate"}>
            {results.upper}
          </Card>
          <Card className={"p-1 m-1"} title={"Lower Estimate"}>
            {results.lower}
          </Card>
          <Card className={"p-1 m-1"} title={"Midpoint Estimate"}>
            {results.midPoint}
          </Card>
        </div>
      </div>
      <div>
        Created by a{" "}
        <a href="https://squidcoportfolio.netlify.app/" target="_blank">
          Squid
        </a>
      </div>
    </div>
  );
}

export default App;
