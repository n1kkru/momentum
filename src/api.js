const config = {
  baseUrl: 'https://api.weatherstack.com/current?access_key=',
  headers: {
    authorization: '42587eb73ebe8d6a90322e74d0ac42b2',
    'Content-Type': 'application/json'
  }
}

export const fetchWeather = () => {
	const url = `${config.baseUrl}${config.headers.authorization}&query=${localStorage.getItem('coordsLatitude')}, ${localStorage.getItem('coordsLongitude')}`
  return fetch(url, {
    method: 'GET',
  })
  .then(res => checkResponse(res))
}

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

