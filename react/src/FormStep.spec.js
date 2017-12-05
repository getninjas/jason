'use stict';

import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import FormStep from './FormStep';

const data = {
  "_embedded": {
  "request_fields": [{
      "reference": null,
      "name": "Qual será o serviço?",
      "label": "Qual será o serviço?",
      "placeholder": "Qual será o serviço?",
      "mask": "tipo de serviço",
      "type": "enumerable",
      "required": true,
      "allow_multiple_value": true,
      "allow_custom_value": false,
      "values": {
          "Coloração": "Coloração",
          "Corte": "Corte",
          "Escova": "Escova",
          "Escova progressiva/definitiva": "Escova progressiva/definitiva",
          "Luzes": "Luzes",
          "Manicure": "Manicure",
          "Pedicure": "Pedicure",
          "Penteado": "Penteado"
      },
      "_embedded": {
          "nested_fields": []
      }
  }, {
      "reference": null,
      "name": "Para quem será o serviço?",
      "label": "Para quem será o serviço?",
      "placeholder": "Para quem será o serviço?",
      "mask": "indique para quem será o serviço",
      "type": "enumerable",
      "required": false,
      "allow_multiple_value": true,
      "allow_custom_value": false,
      "values": {
          "Criança": "Criança",
          "Homem": "Homem",
          "Mulher": "Mulher"
      },
      "_embedded": {
          "nested_fields": []
      }
  }, {
      "reference": null,
      "name": "O serviço será para quantas pessoas?",
      "label": "O serviço será para quantas pessoas?",
      "placeholder": "O serviço será para quantas pessoas?",
      "mask": "indique o número de pessoas",
      "type": "enumerable",
      "required": false,
      "allow_multiple_value": false,
      "allow_custom_value": false,
      "values": {
          "1": "1",
          "2": "2",
          "Mais de 3": "Mais de 3"
      },
      "_embedded": {
          "nested_fields": []
      }
  }, {
      "reference": null,
      "name": "Para quando você precisa deste serviço?",
      "label": "Para quando você precisa deste serviço?",
      "placeholder": "Para quando você precisa deste serviço?",
      "mask": "Indique o prazo do serviço",
      "type": "enumerable",
      "required": true,
      "allow_multiple_value": false,
      "allow_custom_value": false,
      "values": {
          "Hoje ou nos próximos dias": "Hoje ou nos próximos dias",
          "Nos próximos 30 dias": "Nos próximos 30 dias",
          "Nos próximos 3 meses": "Nos próximos 3 meses",
          "Ainda não tenho previsão": "Ainda não tenho previsão"
      },
      "_embedded": {
          "nested_fields": []
      }
  }, {
      "name": "Informações Adicionais",
      "label": "Informações Adicionais",
      "type": "big_text",
      "placeholder": "Descreva o que você precisa",
      "required": false
  }],
  "user_fields": [{
      "name": "lat_lng",
      "label": "Em que bairro será o serviço?",
      "type": "lat_lng",
      "placeholder": "",
      "required": true
  }, {
      "name": "name",
      "label": "Nome",
      "type": "small_text",
      "placeholder": "",
      "required": true
  }, {
      "name": "email",
      "label": "Email",
      "type": "email",
      "placeholder": "Ex: nome@email.com",
      "required": true
  }, {
      "name": "phone",
      "label": "Celular",
      "type": "phone",
      "placeholder": "",
      "required": true
  }]
}};

let formData = {}

describe('#Test FormStep Component', () => {
  it('#Should render FormStep for type normal on first step', () => {
    const tree = renderer.create(<FormStep
        step={data._embedded.request_fields}
        index={0}
        valueInput={formData}
        onBackClick={() => {}}
        dataHandler={() => {}}
        stepBy={'normal' === 'stepby' ? true : false}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('#Should render FormStep for type normal on second step', () => {
    const tree = renderer.create(<FormStep
        step={data._embedded.user_fields}
        index={1}
        valueInput={formData}
        onBackClick={() => {}}
        dataHandler={() => {}}
        stepBy={'normal' === 'stepby' ? true : false}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('#Should render FormStep for type stepby on first step', () => {
    const tree = renderer.create(<FormStep
        step={data._embedded.request_fields}
        index={0}
        valueInput={formData}
        onBackClick={() => {}}
        dataHandler={() => {}}
        stepBy={'stepby' === 'stepby' ? true : false}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('#Should render FormStep for type stepby on second step', () => {
    const tree = renderer.create(<FormStep
        step={data._embedded.user_fields}
        index={1}
        valueInput={formData}
        onBackClick={() => {}}
        dataHandler={() => {}}
        stepBy={'stepby' === 'stepby' ? true : false}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('#Should not render back button', () => {
    const wrapper = shallow(<FormStep
      step={data._embedded.request_fields}
      index={0}
      valueInput={formData}
      onBackClick={() => {}}
      dataHandler={() => {}}
      stepBy={'stepby' === 'stepby' ? true : false}
    />);

    expect(wrapper.contains('Back')).toEqual(false);
  });

  it('#Should render back button', () => {
    const wrapper = shallow(<FormStep
      step={data._embedded.user_fields}
      index={1}
      valueInput={formData}
      onBackClick={() => {}}
      dataHandler={() => {}}
      stepBy={'stepby' === 'stepby' ? true : false}
    />);

    expect(wrapper.contains('Back')).toEqual(true);
  });
});
