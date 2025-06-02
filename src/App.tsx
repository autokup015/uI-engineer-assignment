import { Input } from "./components/custom-input";
import type { TInputList } from "./types/tag-input-types";


import { useState } from "react";

type TTextList = Array<TInputList>;

// ---------------------------------------------------------------------------------

const App = () => {
  const [textList, setTextList] = useState<TTextList>([]);

  // --------------------------- Function ---------------------------

  const onSetValue = (data: TTextList) => {
    // when you have other key you can add below ...
    setTextList(data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h4>UI Engineer Assignment</h4>

        <Input.MultipleInput
          value={textList}
          setValue={(val) => onSetValue(val)}
          // limitItem={5}
          // specialText="+ "
        />
      </div>
    </div>
  );
};

export default App;
