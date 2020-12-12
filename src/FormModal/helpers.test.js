import { onSubmitHandler } from './helpers';

describe('onSubmitHandler', () => {
  it('is call as expected on success', (done) => {
    const onSubmit = jest.fn(() => Promise.resolve({}));
    const callback = jest.fn();
    const values = { name: 'John' };
    const payload = {
      setError: jest.fn(),
      resetForm: jest.fn(),
      setSubmitting: jest.fn(),
    };

    onSubmitHandler(
      onSubmit,
      true,
      callback
    )(values, payload).then(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(values);

      expect(payload.resetForm).toHaveBeenCalledTimes(1);
      expect(payload.resetForm).toHaveBeenCalledWith({ name: '' });

      expect(payload.setSubmitting).toHaveBeenCalledTimes(1);
      expect(payload.setSubmitting).toHaveBeenCalledWith(false);

      expect(payload.setError).toHaveBeenCalledTimes(0);

      expect(callback).toHaveBeenCalledTimes(1);

      done();
    });
  });

  it('is call as expected on error', (done) => {
    const onSubmit = jest.fn(() => Promise.reject({}));
    const callback = jest.fn();
    const values = { name: 'John' };
    const payload = {
      setError: jest.fn(),
      resetForm: jest.fn(),
      setSubmitting: jest.fn(),
    };

    onSubmitHandler(
      onSubmit,
      true,
      callback
    )(values, payload).then(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(values);

      expect(payload.resetForm).toHaveBeenCalledTimes(0);

      expect(payload.setSubmitting).toHaveBeenCalledTimes(1);
      expect(payload.setSubmitting).toHaveBeenCalledWith(false);

      expect(payload.setError).toHaveBeenCalledTimes(1);

      expect(callback).toHaveBeenCalledTimes(0);

      done();
    });
  });
});
