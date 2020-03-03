import { combineReducers } from "redux";
import { news, gallery, store, article, navigate, triggerBar, wideMode, filters,
  galleryViewMode, openedPicture, openedPictureInfo } from "./news";

export default combineReducers({
  news,
  gallery,
  store,
  article,
  navigate,
  triggerBar,
  wideMode,
  filters,
  galleryViewMode,
  openedPicture,
  openedPictureInfo
});
