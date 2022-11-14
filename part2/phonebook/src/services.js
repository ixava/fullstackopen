import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (person) => {
  return axios.post(baseUrl, person);
};

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const services = { getAll, create, update, del, get };
export default services;
