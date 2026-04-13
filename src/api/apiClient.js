import axios from 'axios';

export default axios.create({
  baseURL: 'https://fakestoreapiserver.reactbd.org/api',
  timeout: 3000,
});
