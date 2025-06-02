import type { KeyboardEvent, MouseEvent } from "react";
import { useRef, useState } from "react";

import { v4 as UUID } from "uuid";
import { InputGuard } from "../guard/input-guard";

// ---------------------------------------------------------------------------------

type TMultipleInputProps<T> = {
  value: Array<T>;
  setValue: (item: Array<T>) => void;

  limitItem?: number;
  specialText?: string;
};

type TExtendsValue = { id: string; text: string };

type TModeInput = "FOCUS" | "BLUR";

// ---------------------------------------------------------------------------------

const MultipleInput = <T extends TExtendsValue>({
  value,
  setValue,
  limitItem = 0,
  specialText = ", ",
}: TMultipleInputProps<T>) => {
  const [search, setSearch] = useState("");

  const [statusInput, setStatusInput] = useState<TModeInput>("BLUR");

  const inputRef = useRef<HTMLInputElement | null>(null);

  // --------------------------- Handle Event ---------------------------

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    if (e.key !== "Enter" || !e.target.value || !e.target.value.trim()) {
      return;
    }

    const newValue = {
      id: UUID(),
      text: e.target.value,
    };

    const finalValueList = [...value, newValue] as unknown as Array<T>;

    if (!!limitItem && finalValueList.length > limitItem) {
      return;
    }

    setValue(finalValueList);
    setSearch("");
  };

  // --------------------------- Function ---------------------------

  const handleDeleteItem = (id: string) => {
    const delListValue = value.filter((item) => item.id !== id);

    setValue(delListValue);
  };

  return (
    <div
      data-testid="box-main-input"
      style={{
        width: "300px",
        overflowY: "scroll",
        minHeight: "50px",
        maxHeight: "150px",
        borderRadius: 8,
        border: 1,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 5,
        }}
      >
        <InputGuard
          data={value}
          statusInput={statusInput}
          renderNodata={null}
          renderBlurMode={(item) => (
            <BoxBlurList
              key={item.id}
              data={item}
              onRemove={() => handleDeleteItem(item.id)}
            />
          )}
          renderFocusMode={(item) => {
            const getTextList = item.map((item) => item.text);

            return (
              <BoxFocusList data={getTextList} specialText={specialText} />
            );
          }}
        />

        <input
          data-testid="input-text"
          ref={inputRef}
          style={{
            height: "24px",
            backgroundColor: "transparent",
            borderColor: "transparent",
            outline: "none",
          }}
          type="text"
          placeholder="Placeholder"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleEnterKey}
          onFocus={() => setStatusInput("FOCUS")}
          onBlur={() => setStatusInput("BLUR")}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------------

type TBoxBlurListProps<T> = {
  data: T;

  onRemove: () => void;
};

const BoxBlurList = <T extends TExtendsValue>({
  data,
  onRemove,
}: TBoxBlurListProps<T>) => {
  // --------------------------- Function ---------------------------

  const handleRemoveItem = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "5px",
        border: "1px solid grey",
        gap: 5,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p style={{ margin: 0, wordBreak: "break-all" }}>{data.text}</p>

      <img
        data-testid="button-del"
        src="/icons/close.svg"
        width={15}
        style={{ cursor: "pointer" }}
        onClick={handleRemoveItem}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------------

type TBoxFocusListProps = {
  data: Array<string>;
  specialText: string;
};

const BoxFocusList = ({ data, specialText }: TBoxFocusListProps) => {
  return (
    <>
      {data.map((text, index) => {
        const isLastItem = index + 1 === data.length;

        const formatText = `${text}${!isLastItem ? specialText : ""} `;

        return (
          <p
            key={`focus-item-${index}`}
            style={{ margin: 0, wordBreak: "break-all" }}
          >
            {formatText}
          </p>
        );
      })}
    </>
  );
};

// ---------------------------------------------------------------------------------

export type { TModeInput, TExtendsValue };

export { MultipleInput, BoxBlurList, BoxFocusList };
