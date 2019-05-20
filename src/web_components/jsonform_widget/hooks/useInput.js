import { useState } from 'react';

export const useInput = (defaultValue = '', type = 'text') => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    if (e && e.currentTarget) {
      if (type === 'checkbox') {
        setValue(e.currentTarget.checked);
      } else {
        setValue(e.currentTarget.value);
      }
    }
  };

  return [value, onChange];
};


export default useInput;
