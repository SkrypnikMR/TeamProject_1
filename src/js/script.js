import { URL, getRequest, postRequest } from "./request";
import { renderServerDeveloperData } from "./render";

if (
  window.location.pathname === "/" || // если открыта страница index
  window.location.pathname === "/index.html"
) {
  //старт страницы начинается с гет запроса по девелоперсам
  getRequest(URL, "developers")
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      renderServerDeveloperData(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
