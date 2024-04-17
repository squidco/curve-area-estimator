import React from "react";
import TextInput from "./TextInput";

export default function Calculator() {
  return (
    <div>
      <TextInput id={"function"} label={"Function"} placeholder={"y=mx+b"} />
      <TextInput id={"domain"} label={"Domain"} placeholder={"[0,5]"} />
      <TextInput
        id={"rectangles"}
        label={"Number of Rectangles"}
        placeholder={"4"}
      />
    </div>
  );
}
