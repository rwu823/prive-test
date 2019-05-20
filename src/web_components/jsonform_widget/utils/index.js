export const escap = (s = '') => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

export const switchCase = (type, defaultValue) => (
  ...conditions
) => {
  let value = defaultValue;

  conditions.some(condsValue => {
    const conds = condsValue.slice(0, condsValue.length - 1);

    if (new Set(conds).has(type)) {
      [value] = condsValue.slice(-1);

      return true;
    }

    return false;
  });

  if (typeof value === 'function') {
    value = value();
  }

  return value;
};


export const act = (type, payload) => ({ type, payload });
