# UI Engineer Assignment

This input same like multiple select

How to use

```ts
<Input.MultipleInput
  value={textList}
  setValue={(val) => onSetValue(val)}
  limitItem={5} // optional 
  specialText="+ " // optional
/>
```

# Explan props 
1. value = state array, you can add every key in array object but this value must have id and text key only
2. setValue = callback function when component have some action such as add or remove, this setvalue will call and sent value on (val) => {...}
3. limitItem (optional) = limit for add text, when you use 5 value can have 5 unit only, but you dont use limitItem you can add until you tired
4. specialText (optional) = special key when you focus out input, default special is ', ' it can be use another special key that you want

# How to use
1. Click on input or main div for active input
2. Write something to input (if blank or specbar can't add) and use Enter key on your keyboard for save your input
3. Component have 3 render, (nodata, renderBlur, renderFocus) it can modify if you want
4. When value is not blank can delete item on delete button 