# UI Engineer Assignment

This input same like multiple select

How to use

```ts
<Input.MultipleInput
  value={textList}
  onSetValue={(val) => onSetValue(val)}
  onDeleteValue={(val) => onDeleteValue(val)}
  // limitItem={5}
  // specialText="+ "
/>
```

# Explan props

1. value = state array, you can add every key in array object but this value must have id and text key only
2. onSetValue = callback function when component have some action such as add or remove, this setvalue will call and sent value on (val) => {...}
3. onDeleteValue = component will send back value for handle remove by your condition
4. limitItem (optional) = limit for add text, when you use 5 value can have 5 unit only, but you dont use limitItem you can add until you tired
5. specialText (optional) = special key when you focus out input, default special is ', ' it can be use another special key that you want

# How to use

1. Click on input or main div for focus or active input
2. Write something to input (if blank or specbar can't add) and use Enter key on your keyboard for save your input
3. Component have 3 render, (nodata, renderBlur, renderFocus) it can modify if you want
4. When value is not blank, it can delete item on delete button on blur mode
