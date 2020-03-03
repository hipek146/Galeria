export const news = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NEWS_SUCCESS':
      return [
        ...action.news
      ]
    default:
      return state
  }
}

export const gallery = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_GALLERY_SUCCESS':
      return [
        ...action.gallery
      ]
    default:
      return state
  }
}

export const store = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_STORE_SUCCESS':
      return [
        ...action.store
      ]
    default:
      return state
  }
}

export const openedPictureInfo = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PICTURE_SUCCESS':
      return [
        ...action.info
      ]
    default:
      return state
  }
}

export const article = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ARTICLE_SUCCESS':
      return [
        ...action.article
      ]
    default:
      return state
  }
}

export const navigate = (state = [], action) => {
  switch (action.type) {
    case 'NAVIGATION':
      return action
    default:
      return state
  }
}

export const triggerBar = (state = [], action) => {
  switch (action.type) {
    case 'TRIGGER_BAR':
      return action.mode
    default:
      return state
  }
}

export const wideMode = (state = [], action) => {
  switch (action.type) {
    case 'WIDE_MODE':
      return action.mode
    default:
      return state
  }
}

export const filters = (state = [], action) => {
  switch (action.type) {
    case 'FILTERS_UPDATED':
      return action.filters
    default:
      return state
  }
}

export const galleryViewMode = (state = [], action) => {
  switch (action.type) {
    case 'GALLERY_VIEWMODE_TRIGGERED':
      return action.mode
    default:
      return state
  }
}

export const openedPicture = (state = [], action) => {
  switch (action.type) {
    case 'PICTURE_OPENED':
      return action.name
    default:
      return state
  }
}
