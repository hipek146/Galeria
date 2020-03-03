import React from 'react';
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import '../styles/Filter.css';
import theme from '../theme';
import pictureInfo from '../pictureInfo.json';
import { updateFilter, triggerGalleryViewMode } from '../actions';

import tilesImage from 'assets/icons/tiles.svg';
import listImage from 'assets/icons/list.svg';

import { List } from '../components/List';
import { MultipleList } from '../components/MultipleList';
import FilterList from '../components/FilterList';
import Slider from '../components/Slider';

class Filter extends React.Component {
  constructor() {
    super();
    this.search = this.search.bind(this)
  }

  update(element, value) {
    var obj = {};
    obj[element] = value;
    this.props.updateFilter(Object.assign({}, this.props.filters, obj));
  }

  viewModeTrigger(mode) {
    if(mode !== this.props.viewMode) {
      this.props.triggerGalleryViewMode(mode);
    }
  }

  search() {
    this.update("name", this.searchRef.value)
  }

  render() {
    const { t } = this.props;
    //i18n.changeLanguage('pl')
    const filters = Object.keys(pictureInfo).map(element =>
      {
        var obj = {};
        for (var i = 0; i < pictureInfo[element].length; i++) {
          obj[pictureInfo[element][i]] = t(pictureInfo[element][i]);
        }
        return(
        <FilterList
          key={'filter_'+element}
          name={element}
          options={obj}
          update={this.update.bind(this, element)}
        />
        )
      }
    );
    return (
      <div style={style.main}>
        <div style={style.content}>
            <div className="filterHeader">
                <div className="filterHolder">
                    <input className="filterSearch" type="text" placeholder={t('search')} ref={ref => this.searchRef = ref} onChange={this.search} />
                </div>
                {!this.props.hideView &&
                <div className="filterViewContainer">
                  <div className="filterView">
                    <div className="filterViewTxt" >
                        {t('view')}
                    </div>
                    <div className={"filterButton " + (this.props.viewMode === 'tiles'? "filterButtonActive" : "filterButtonInactive")}
                      onClick={this.viewModeTrigger.bind(this, 'tiles')}
                    >
                        <img src={tilesImage} className="filterButtonImage" />
                    </div>
                    <div className={"filterButton " + (this.props.viewMode === 'list'? "filterButtonActive" : "filterButtonInactive")}
                      onClick={this.viewModeTrigger.bind(this, 'list')}
                    >
                        <img src={listImage} className="filterButtonImage" />
                    </div>
                  </div>
                </div>
                }
                <Slider name={t('width')} min={37} max={122} update={this.update.bind(this, 'width')} />
                <Slider name={t('height')} min={44} max={82} update={this.update.bind(this, 'height')} />
                {t('filter')}
                {filters}
            </div>
        </div>
      </div>
    );
  }
}

const style = {
  main: {
    background: theme.filter,
    height: '100vh',
    width: '300px',
    paddingTop: '60px',
    position: 'fixed',
    border: '1px solid #222',
    boxShadow: '1px 0px 4px 2px #333',
    boxSizing: 'border-box',
    zIndex: '8',
  },
  content: {
    overflowY: 'auto',
    height: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    texAlign: 'center',
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    viewMode: state.galleryViewMode
  };
};
const mapDispatchToProps = { updateFilter, triggerGalleryViewMode };

const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(Filter);

export const FilterContainer = withTranslation()(FilterRedux);
