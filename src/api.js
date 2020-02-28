const baseUrl = 'http://127.0.0.1:4010/';

const checkResponseStatus = response => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};

export const fetchListOfOffers = (perPage = 20) =>
  fetch(`${baseUrl}offers?offset=${perPage}&status=published`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));

export const fetchSingleOffer = id =>
  fetch(`${baseUrl}offers/${id}`)
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
