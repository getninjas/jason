export default {
  get: jest.fn((url) => {
    if(url==='http://unknowservice/04707060') {
      return Promise.reject({ data: {}});
    }
    return Promise.resolve({ data: { type_street: '', street: 'Rua Mock', city: 'Cidade Mock', neighborhood: 'Bairro Mock', uf: 'SP' }});
  })
};
