const exampleMiddleware = require('../backend/middleware/exampleMiddleware');

describe('exampleMiddleware', () => {
  it('should call next()', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    exampleMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
}); 