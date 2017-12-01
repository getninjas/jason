const request = () => {
  return fetch('https://raw.githubusercontent.com/nathpaiva/form-rendering/master/fields.json')
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
