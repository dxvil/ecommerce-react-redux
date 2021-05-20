export const required = (value) => {
  if (value) return undefined;
  return "Field is required";
};

export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `Max length is ${maxLength}`;
};

export const minLength = (minLength) => {
  if(minLength < 6) {
    return 'Min length of password is 6';
  }
}

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
