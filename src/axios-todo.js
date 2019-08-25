import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-list-98134.firebaseio.com/'
});

export default instance;