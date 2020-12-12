"use strict";

var _helpers = require("./helpers");

describe('onSubmitHandler', function () {
  it('is call as expected on success', function (done) {
    var onSubmit = jest.fn(function () {
      return Promise.resolve({});
    });
    var callback = jest.fn();
    var values = {
      name: 'John'
    };
    var payload = {
      setError: jest.fn(),
      resetForm: jest.fn(),
      setSubmitting: jest.fn()
    };
    (0, _helpers.onSubmitHandler)(onSubmit, true, callback)(values, payload).then(function () {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(values);
      expect(payload.resetForm).toHaveBeenCalledTimes(1);
      expect(payload.resetForm).toHaveBeenCalledWith({
        name: ''
      });
      expect(payload.setSubmitting).toHaveBeenCalledTimes(1);
      expect(payload.setSubmitting).toHaveBeenCalledWith(false);
      expect(payload.setError).toHaveBeenCalledTimes(0);
      expect(callback).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('is call as expected on error', function (done) {
    var onSubmit = jest.fn(function () {
      return Promise.reject({});
    });
    var callback = jest.fn();
    var values = {
      name: 'John'
    };
    var payload = {
      setError: jest.fn(),
      resetForm: jest.fn(),
      setSubmitting: jest.fn()
    };
    (0, _helpers.onSubmitHandler)(onSubmit, true, callback)(values, payload).then(function () {
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