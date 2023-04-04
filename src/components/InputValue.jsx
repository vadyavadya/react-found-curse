import React, { useState } from "react";


const InputValue = ({ text }) => {

  const [value1, setValue1] = useState(text);

  return (
    <div>
      <h2>{value1}</h2>
      <input
        type='text'
        value={value1}
        onChange={event => setValue1(event.target.value)}
      />
    </div>
  )
}

export default InputValue;
