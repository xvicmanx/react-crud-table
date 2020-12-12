export const onSubmitHandler = (onSubmit, shouldReset, callback) => (
  values,
  { setError, resetForm, setSubmitting }
) => {
  const reset = Object.keys(values).reduce(
    (result, prop) => ({
      ...result,
      [prop]: '',
    }),
    {}
  );

  const result = onSubmit(values);
  return result
    .then(() => {
      if (shouldReset) {
        resetForm(reset);
      }

      setSubmitting(false);
      callback();
    })
    .catch((err) => {
      setError(err ? err.message : 'Unexpected error');
      setSubmitting(false);
    });
};
