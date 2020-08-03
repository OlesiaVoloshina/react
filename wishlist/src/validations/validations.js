
export const notEmpty = (value) => { return value && value.trim().length > 0};
export const greaterThan = (value, limit) => { return !value || value > limit};
export const lessThan = (value, limit) => { return !value || value < limit};
export const minLength = (value, length = 1) => { return value && value.trim().length >= length};
export const maxLength = (value, length = 255) => { return !value || value.trim().length < length};