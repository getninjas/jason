import addPlaceholder from '../../src/helpers/select';

describe('selectHelper', () => {
  it('returns a placeholder in first option', () => {
    const select = {
      placeholder: 'Placeholder',
      values: [
        {
          databaseId: 1,
          value: 'Reformas',
        },
        {
          databaseId: 2,
          value: 'Reparos',
        },
      ],
    };

    const result = addPlaceholder(select);

    expect(result[0].value).toEqual('Placeholder');
  });

  it('does not set a placeholder in first option', () => {
    const select = {
      placeholder: '',
      values: [
        {
          databaseId: 1,
          value: 'Reformas',
        },
        {
          databaseId: 2,
          value: 'Reparos',
        },
      ],
    };

    const result = addPlaceholder(select);

    expect(result[0].value).toEqual('Reformas');
  });
});
