import { Input } from "./components/custom-input";
import type { TInputList } from "./types/tag-input-types";

import { useState } from "react";

// declare for union type
type TTextList = TInputList;

// ---------------------------------------------------------------------------------

const App = () => {
  const [textList, setTextList] = useState<Array<TTextList>>([]);

  // --------------------------- Function ---------------------------

  const onSetValue = (data: TTextList) => {
    // when you have other key you can add below ...
    setTextList([...textList, data]);
  };

  const onDeleteValue = (data: TTextList) => {
    const deleteValue = textList.filter((item) => item.id !== data.id);

    setTextList(deleteValue);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h4>UI Engineer Assignment</h4>

        <Input.MultipleInput
          value={textList}
          onSetValue={onSetValue}
          onDeleteValue={onDeleteValue}
          // limitItem={5}
          // specialText="+ "
        />
      </div>
    </div>
  );
};

export default App;
