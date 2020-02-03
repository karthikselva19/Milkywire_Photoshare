import { GET_ALL_IMAGES, UPLOAD_PHOTO, DELETE_POST, OPEN_ICON_MENU, EXPAND_POST } from '../actions/index';

const initialState = {
    imageData: [],
    open: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case GET_ALL_IMAGES:
      return { ...state, imageData: action.imageData.map(images => Object.assign({}, images, {open: false}))}
    case UPLOAD_PHOTO:
      return {...state}
    case DELETE_POST:
      const imageNo = action.no
      return {...state, imageData: state.imageData.filter(image => image.no !== imageNo)}
    case OPEN_ICON_MENU:
      return {...state, open: !state.open}
    case EXPAND_POST:
      return {
        ...state,
        imageData: state.imageData.map(images =>
          (images.no === action.no)
            ? Object.assign({}, images, {open: !images.open}) : images
        )
      }
    default:
      return state;
  }
}
