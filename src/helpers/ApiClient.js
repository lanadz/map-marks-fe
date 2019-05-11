function ApiClient(resourceURI, options, callback) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  for (const header in options.headers) {
    headers.append(header, options.headers[header]);
  }

  const baseURI = process.env.REACT_APP_API_URL;

  const init = {
    method: options.method || 'GET',
    headers,
    mode: 'cors',
    body: options.body,
  };

  let request = '';

  request = new Request(baseURI + resourceURI, init);

  fetch(request).then((response) => {
    const json = response.json();

    if (response.ok) {
      return json;
    }
    if (response.status === 401) {
      return json.then((error) => {
        throw new UnauthorisedException(error);
      });
    }
    return json.then((error) => {
      throw error;
    });
  }).then((json) => {
    callback(null, json.data);
  }).catch((error) => {
    if (error instanceof UnauthorisedException) {
      console.log(`Unauthorised: ${error}`);
    } else {
      console.log(`There has been a problem with your fetch operation: ${error}`);
      callback(error, {});
    }
  });
}

function UnauthorisedException(error) {
  this.status = 401;
  this.toString = function () {
    return 'Access denied.';
  };
}

export default ApiClient;
