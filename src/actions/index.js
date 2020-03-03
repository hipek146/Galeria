export const newsFetched = (news) => ({
  type: 'FETCH_NEWS_SUCCESS',
  news
});

export const galleryFetched = (gallery) => ({
  type: 'FETCH_GALLERY_SUCCESS',
  gallery
});

export const storeFetched = (store) => ({
  type: 'FETCH_STORE_SUCCESS',
  store
});

export const pictureFetched = (info) => ({
  type: 'FETCH_PICTURE_SUCCESS',
  info
});

export const articleFetched = (article) => ({
  type: 'FETCH_ARTICLE_SUCCESS',
  article
});

export const galleryNavigation = () => ({
  type: 'NAVIGATION_GALLERY'
});

export const navigate = (destination, push = true) => ({
  type: 'NAVIGATION',
  destination: destination,
  push: push
});

export const triggerBar = (mode) => ({
  type: 'TRIGGER_BAR',
  mode
});

export const wideMode = (mode) => ({
  type: 'WIDE_MODE',
  mode
});

export const updateFilter = (filters) => ({
  type: 'FILTERS_UPDATED',
  filters
});

export const triggerGalleryViewMode = (mode) => ({
  type: 'GALLERY_VIEWMODE_TRIGGERED',
  mode
});

export const openPicture = (name) => ({
  type: 'PICTURE_OPENED',
  name
});
