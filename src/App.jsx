import "./App.css";
import { useState } from "react";
import estimates from "./utils/curveEstimator";
import TextInput from "./components/TextInput";
import Card from "./components/Card";

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
    setResults(estimatedArea);
  }

  return (
    <>
      <div className="flex flex-col mx-auto justify-center">
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
        <button className="w-fit self-center" onClick={onSubmit}>Estimate</button>
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
