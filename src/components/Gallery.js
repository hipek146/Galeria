import React from 'react';
import { connect } from 'react-redux';
import { hostAPI } from 'config';
import { galleryFetched, triggerGalleryViewMode } from 'actions';
import pictureInfo from 'pictureInfo.json';
import 'styles/Gallery.css';

import { PictureTileContainer } from '../components/PictureTile';
import { PictureListContainer } from '../components/PictureList';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {description: ''};
    //this.setDescription = this.setDescription.bind(this);
  }

  galleryFetch() {
    var string =  Object.keys(this.props.filters).map(element =>{
      if(element === 'width' || element === 'height') {return element.toUpperCase()+'='+this.props.filters[element]['min']+'_'+this.props.filters[element]['max']}
      else if (element === 'name') {return this.props.filters[element] ? element.toUpperCase()+'='+this.props.filters[element] : ''}
      else
      return(
        !this.props.filters[element]['all'] ? (element.toUpperCase() + "=" + Object.keys(this.props.filters[element]).map(pct =>
          this.props.filters[element][pct] ? pct : ''
        )
        .filter(Boolean)
        .join(['_'])
      ): ''
    )});
    string = string.join(['&']);
    fetch(hostAPI+'/gallery_pl'+(string ? ('?'+string) : ''))
      .then(res => res.json())
      .then(json => this.props.galleryFetched(json));
  }

  setDescription(number) {
    this.setState({
      description: this.props.gallery[number]['DESCRIPTION']
    });
  }

  clearDescription() {
    this.setState({
      description: ''
    });
  }

  componentDidMount() {
    this.galleryFetch();
    this.props.triggerGalleryViewMode('tiles');
  }

  componentDidUpdate(prevProps) {
     if(prevProps.filters !== this.props.filters) {
       this.galleryFetch();
    }
  }

  render() {
    var index = 0;
    var tiles, list;
    tiles = this.props.gallery.map(element => {
      var obj = Object.keys(pictureInfo).map(pct => element[pct.toUpperCase()]);
      return (
          <PictureTileContainer
            name={element.NAME}
            image={element.IMAGE}
            info={obj}
            date={element.DATE}
            width={element.WIDTH}
            height={element.HEIGHT}
            onMouseOver={this.setDescription.bind(this, index++)}
            onMouseOut={this.clearDescription.bind(this)}
          />
      )
    });
    list =  this.props.gallery.map(element => {
      var obj = Object.keys(pictureInfo).map(pct => element[pct.toUpperCase()]);
      return (
          <PictureListContainer
            name={element.NAME}
            image={element.IMAGE}
            description={element.DESCRIPTION}
            info={obj}
          />
      )
    });
    return (
      <>
      <div style={style.main}>
          {this.props.viewMode === 'tiles' ? tiles : list}
      </div>
      {this.props.viewMode === 'tiles' && <div className="galleryDescriptionContainer">
        <div className={"galleryDescription"}>
          <div className="galleryDescriptionText">
          {this.state.description}
          </div>
        </div>
      </div>
      }
      </>
    );
  }
}

const style = {
  main: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: '50px',
  }
}

const mapStateToProps = (state) => {
  return {
    gallery: state.gallery,
    filters: state.filters,
    viewMode: state.galleryViewMode,
  };
};
const mapDispatchToProps = { galleryFetched, triggerGalleryViewMode };

export const GalleryContainer = connect(mapStateToProps, mapDispatchToProps)(Gallery);
