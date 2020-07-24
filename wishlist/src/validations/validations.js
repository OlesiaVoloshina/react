

export const notEmpty = (value) => { return value && value.trim().length > 0};
export const minLength = (value, length = 1) => { return value && value.trim().length >= length};
export const maxLength = (value, length = 255) => { return !value || value.trim().length < length};