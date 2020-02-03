import axios from 'axios';
import { formatListing } from '../helpers/formatValues';

export const GET_ALL_IMAGES = 'get_all_images';
export const UPLOAD_PHOTO = 'upload_photo';
export const DELETE_POST = 'delete_post';
export const OPEN_ICON_MENU = 'open_icon_menu';
export const EXPAND_POST = 'expand_post'


export const getPhoto = () =>{
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/getImages');
      console.log(res);
      dispatch({ type: GET_ALL_IMAGES, imageData: res.data});
    } catch(error) {
      console.log(error);
      // if (error.response) {
      //   // The request was made and the server responded with a status code
      //   // that falls out of the range of 2xx
      //   console.log(error.response.data);
      //   // console.log(error.response.status);
      //   // console.log(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //   // http.ClientRequest in node.js
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
    }
  }
}


export const uploadPhotoAction = (uploadPhoto, userName, imagesCount, history) =>{
  return async (dispatch) => {
    try {
      const data = formatListing(uploadPhoto);
      // console.log(data);
      data.append('userName', userName);
      data.append('imagesCount', imagesCount);
      // for (var pair of data.entries()) {
      //      console.log(pair[1]);
      //  }
      const res = await fetch('api/uploadImage',{
        method: 'post',
        body: data
      })
      dispatch({ type: UPLOAD_PHOTO});
      history.push('/');
    } catch(error){
      console.log(error.response);
    }
  }
}

export const deletePost = (id, history) => {
  return async (dispatch) => {
    try{
      const res = await axios.post('/api/deletPost', {'no': id});
      dispatch({ type: DELETE_POST, no: id});
      // history.push('/');
    } catch(error){
      console.log(error.response);
    }
  }
}

export function openIconMenu() {
  return {type: OPEN_ICON_MENU};
}

export function expandPost(id) {
  return {type: EXPAND_POST, no: id};
}
