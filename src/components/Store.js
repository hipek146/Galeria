import React from 'react';
import { connect } from 'react-redux';
import { hostAPI } from 'config';
import { storeFetched, triggerGalleryViewMode } from 'actions';
import pictureInfo from 'pictureInfo.json';

import { PictureListContainer } from '../components/PictureList';

class Store extends React.Component {
  componentDidMount() {
    this.props.triggerGalleryViewMode('list');
    this.storeFetch();
  }

  componentDidUpdate(prevProps) {
     if(prevProps.filters !== this.props.filters) {
       this.storeFetch();
    }
  }

  storeFetch() {
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
    fetch(hostAPI+'/store/pl'+(string ? ('?'+string) : ''))
      .then(res => res.json())
      .then(json => this.props.storeFetched(json));
  }

  render() {
    var list;
    list =  this.props.store.map(element => {
      var obj = Object.keys(pictureInfo).map(pct => element[pct.toUpperCase()]);
      return (
          <PictureListContainer
            name={element.NAME}
            image={element.IMAGE}
            description={element.DESCRIPTION}
            info={obj}
            price={element.PRICE}
          />
      )
    });
    return(
      <div style={style.main}>
        {list}
      </div>
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
    filters: state.filters,
    store: state.store,
  };
};

const mapDispatchToProps = { storeFetched, triggerGalleryViewMode };

export const StoreContainer = connect(mapStateToProps, mapDispatchToProps)(Store);
