export default {
  get: jest.fn((url) => {
    if (url === 'http://www.mocky.io/v2/5afd92203200009f00f1ad2c') {
      return Promise.reject({ data: {} });
    }
    return Promise.resolve({ data: { type_street: '', street: 'Rua Mock', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' } });
  }),
  post: jest.fn((url, body) => {
    return Promise.resolve({ data: { link: 'https://testdomain.com' } });
  }),
};
