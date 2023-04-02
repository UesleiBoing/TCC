import axios from 'axios';
import * as dotenv from 'dotenv';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default api;
