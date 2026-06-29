export const expandSelectValue = (valueArray, options) => {
  if (Array.isArray(valueArray)) {
    return valueArray.map(value => expandValue(value, options));
  }
  return expandValue(valueArray, options);
};

const expandValue = (value, options) => {
  const valueType = typeof value;
  if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
  if (!options) return;
  for (let i = 0; i < options.length; i++) {
    if (String(options[i].value) === String(value)) return options[i];
  }
};

export function sortOptionsByLabel(options = [], isNoSort = false) {
  if (!Array.isArray(options)) return options;
  try {
    if (options && isNoSort) {
      options.sort((a = {}, b = {}) => {
        let { label: aLabel = '' } = a;
        let { label: bLabel = '' } = b;
        if (aLabel == null) aLabel = '';
        if (bLabel == null) bLabel = '';
        if (aLabel.toLowerCase() < bLabel.toLowerCase()) return -1;
        if (aLabel.toLowerCase() > bLabel.toLowerCase()) return 1;
        return 0;
      });
    }
  } catch (error) {
    console.warn(error);
  }
  return options;
}

export const createOptions = (options, value, label) => {
  if (validate(options)) {
    for (let i = 0; i < options.length; i++) {
      options[i].value = options[i][value];
      options[i].label = options[i][label];
    }
  }
  return options;
};

export const validate = (value) =>
  value != null && value !== undefined && value !== '';
