import React from 'react';
import { connect } from 'react-redux';
import { newsFetched } from '../actions';

import { NewsNoteContainer } from '../components/NewsNote'

class News extends React.Component {
  render() {
    const newsArray = this.props.news.map(element =>
      <NewsNoteContainer
          key={'news_'+element.ID}
          title={element.TITLE}
          date={element.DATE}
          image={element.IMAGE}
          cover={element.COVER}
          content={element.DESCRIPTION}
      />
    );
    return (
      <div style={style.main}>
          <div style={style.header}>
              Aktualności
          </div>
          <div style={style.news}>
              {newsArray}
          </div>
      </div>
    );
  }
}

const style = {
  main: {
    width: '100%',
    marginTop: '60px',
    boxSizing: 'border-box',
  },
  header: {
    fontFamily: 'Fira Sans',
    fontWeight: '700',
    fontSize: '30px',
    textAlign: 'left',
    marginLeft: '5%',
    paddingLeft: '5%',
    borderBottom: '2px solid #333',
    boxShadow: '0 7px 4px -7px #333',
    width: '80%',
    boxSizing: 'border-box',
  },
  news: {
    maxWidth: '1200px',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    marginTop: '20px',
    boxSizing: 'border-box',
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news
  }
};
const mapDispatchToProps = { newsFetched };

export const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News);
