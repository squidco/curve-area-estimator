import React, { useState } from "react";
import estimates from "../utils/curveEstimator";
import TextInput from "./TextInput";

export default function Calculator() {
  const [userInput, setUserInput] = useState({
    equation: "",
    domain: "",
    numberOfRectangles: "",
  });

  const [results, setResults] = useState({});

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
    setResults(estimatedArea)
  }
  return (
    <div>
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
    </div>
  );
}
