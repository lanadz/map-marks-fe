function ApiClient(resourceURI, options, callback) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  for (const header in options.headers) {
    headers.append(header, options.headers[header]);
  }

  let baseURI = process.env.REACT_APP_API_URL;

  let init = {
    method: options.method || 'GET',
    headers: headers,
    mode: 'cors',
    body: options.body
  };

  var request = '';

  request = new Request(baseURI + resourceURI, init);

  fetch(request).then(function (response) {
    let json = response.json();

    if (response.ok) {
      return json;
    } else {
      if (response.status === 401) {
        return json.then(error => {
          throw new UnauthorisedException(error);
        });
      }
      return json.then(error => {
        throw error;
      });
    }
  }).then((json) => {
    callback(null, json['data']);
  }).catch((error) => {
    if (error instanceof UnauthorisedException) {
      console.log('Unauthorised: ' + error);
    } else {
      console.log('There has been a problem with your fetch operation: ' + error);
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
