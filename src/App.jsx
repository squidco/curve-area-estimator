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
      setPlotData([{...plotData, x: plotValues.x, y: plotValues.y}])
      setResults(estimatedArea);
      setShowGraph(true);
  }

  return (
    <>
      <div className="flex flex-col mx-auto justify-center text-center">
        <h1 className="font-bold">Curve Area Estimator</h1>
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
        {showGraph && (
          <div>
            <Graph
              plotData={plotData}
            />
          </div>
        )}
        <div className="flex justify-center">
          <Card title={"Upper Estimate"}>{results.upper}</Card>
          <Card title={"Lower Estimate"}>{results.lower}</Card>
          <Card title={"Midpoint Estimate"}>{results.midPoint}</Card>
        </div>
      </div>
    </>
  );
}

export default App;
