import { MESSAGES } from './Messages';

export const validateForm = (name, value, field, preValidation, postValidation) => {
  if (!value || value === undefined)
    return { hasError: true, errorMsg: MESSAGES.MANDATORY };

  if (!field) return { hasError: false, errorMsg: '' };

  if (preValidation) {
    const result = preValidation(name, value, field);
    if (result) return result;
  }

  if (field.ismandatory === true && (!value || (Array.isArray(value) && value.length < 1)))
    return { hasError: true, errorMsg: field.messages?.mandatory || MESSAGES.MANDATORY };

  if (value && field.minSize && field.minSize > value.length)
    return { hasError: true, errorMsg: field.messages?.minSize || MESSAGES.MIN_SIZE.replace('#{value}', field.minSize) };

  if (value && field.maxSize && field.maxSize < value.length)
    return { hasError: true, errorMsg: field.messages?.maxSize || MESSAGES.MAX_SIZE.replace('#{value}', field.maxSize) };

  if (value && field.maxLength && field.maxLength < value.length)
    return { hasError: true, errorMsg: field.messages?.maxLength || MESSAGES.MAX_LENGTH.replace('#{value}', field.maxLength) };

  if (value && field.minLength && field.minLength > value.length)
    return { hasError: true, errorMsg: field.messages?.minLength || MESSAGES.MIN_LENGTH.replace('#{value}', field.minLength) };

  if (value && field.regex && !field.regex.test(value))
    return { hasError: true, errorMsg: field.messages?.regex || MESSAGES.REG_EX };

  if (postValidation) {
    const result = postValidation(name, value, field);
    if (result) return result;
  }

  return { hasError: false, errorMsg: '' };
};
