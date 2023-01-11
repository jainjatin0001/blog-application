import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/'
});

export const registerUser = async(data) => {
    return API.post('/auth/register', data);
}

export const loginUser= async(data) => {
    return API.post('/auth/login', data);
}

//widow location post-> single post
export const postUser= async(data) => {
    return API.post('/posts', data);
}

// post user -> user setting 
export const userPost = async(path , data) => {
    return API.put('/users/'+ path, data)
}

// upload file
export const uploadUser= async(data) => {
    return API.post('/upload', data);
}
// get post in singlepost
export const GetPost= async(path) => {
    return API.get('/posts/'+path)
}

// categories sidebar
export const GetCat= async() => {
    return API.get('/categories/')
}

// home get post 
export const postSearch= async(data) => {
    return API.get('/posts' + data)
}

// delete post
export const deletePost= async(path, data) => {
    return API.delete('/posts/'+ path, data)
}

//update post 
export const updatePost = async (path, data) => {
    return API.put('/posts/'+ path, data)
}