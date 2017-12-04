const request = () => {
  return fetch('https://gist.githubusercontent.com/nathpaiva/6e2bda071405e2e6711a642ff139dacf/raw/d6cf5ff96f8d3294972c5dbb24482d4d17a37da7/form-stepby')
  // return fetch('https://gist.githubusercontent.com/nathpaiva/6b1aad9203ab8c3abf97113c45e310ea/raw/5150fe9f8a2c9930ae02bb967408f45c5b2e1870/form-normal')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log('fetch fails', error);
    });
}

export default request;
