import { useState, useEffect, useCallback } from 'react';
import { validateForm } from './FormValidator';

export default function useFieldItem(FIELDS, initialValues = {}, options = {}) {
  const { preValidation, postValidation, onValueChange } = options;

  const [values, setValues] = useState(initialValues);
  const [fields, setFields] = useState({});

  useEffect(() => {
    if (Object.keys(initialValues).length > 0) setValues(initialValues);
  }, [initialValues]);

  const changeHandler = (name, value, obj) => {
    const { isTouched } = obj || { isTouched: false };
    if (isTouched) value = values[name];

    const fieldValues = fields;
    if (FIELDS[name]) {
      const validate = validateForm(name, value, FIELDS[name], preValidation, postValidation);
      fieldValues[name] = validate || { hasError: false, errorMsg: '' };
    }

    const [newValues = null] = onValueChange ? onValueChange(name, value, values, fieldValues) : [];

    setValues(prev => newValues != null ? newValues : { ...prev, [name]: value });
    setFields(fieldValues);

    if (isTouched && fields[name]?.hasError) {
      setFields(fields);
      return false;
    }
  };

  const validator = (keys) => {
    const fieldValues = { ...fields };
    keys.forEach(key => {
      const validate = validateForm(key, values[key], FIELDS[key], preValidation, postValidation);
      fieldValues[key] = validate || { hasError: false, errorMsg: '' };
    });
    const hasError = Object.values(fieldValues).some(f => f.hasError);
    setFields(fieldValues);
    return hasError;
  };

  const valuesReset = () => {
    setValues(initialValues);
    setFields({});
  };

  const handleChange    = useCallback(changeHandler, [FIELDS, values, fields]);
  const validateValues  = useCallback(validator,     [FIELDS, values, fields]);
  const reset           = useCallback(valuesReset,   [FIELDS, values, fields]);

  return [values, fields, handleChange, { validateValues, reset }];
}
