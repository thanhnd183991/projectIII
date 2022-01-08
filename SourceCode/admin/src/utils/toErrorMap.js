export const toErrorMap = (errors) => {
  let errorMap = {};
  if (errors instanceof Array) {
    errors.forEach(({ field, message }) => {
      errorMap[field] = message;
    });
    return errorMap;
  } else return null;
};
