const { example } = require('../backend/controllers/exampleController');

describe('exampleController', () => {
  it('should return example message', () => {
    const req = {};
    const res = { json: jest.fn() };
    example(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Example controller working!' });
  });
}); 