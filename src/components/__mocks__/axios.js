export default {
  get: jest.fn((url) => {
    if (url === 'http://www.mocky.io/v2/5afd92203200009f00f1ad2c') {
      return Promise.reject({ data: {} });
    }
    return Promise.resolve({ data: { type_street: '', street: 'Rua Mock', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' } });
  }),
  post: jest.fn((url, body) => {
    if (!url.length) {
      const error = new Error({
        config: {},
        data: '',
        headers: {},
        request: {},
        status: 404,
        statusText: 'Not Found',
      });

      return Promise.reject(error);
    }
    return Promise.resolve({ data: { link: 'https://testdomain.com' } });
  }),
};
