import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { triggerBar, articleFetched } from 'actions';
import { hostAPI } from 'config';
import 'styles/NewsScreen.css';

import { NewsContainer } from 'components/News';

import Picture from 'components/article/Picture';

class NewsScreen extends React.Component {
  componentDidMount() {
    this.props.triggerBar(true);
    this.articleFetch(this.props.name);
  }

  articleFetch(name) {
    console.log(name);
    fetch(hostAPI+'/article/pl?name='+name)
      .then(res => res.json())
      .then(json => {window.scrollTo(0, 0); return this.props.articleFetched(json)});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.name != this.props.name) {
      this.articleFetch(this.props.name);
    }
  }

  render() {
    var convertedDate, content = [];
    if(this.props.article) {
      convertedDate = new Date(this.props.article.DATE);
      let start = 0, end, i = 0;
      while(true) {
        end = this.props.article.CONTENT.indexOf("<Picture", start);
        if(end === -1 || i > 100) {
          content.push(this.props.article.CONTENT.substring(start, this.props.article.CONTENT.length))
          break;
        }
        content.push(this.props.article.CONTENT.substring(start, end));
        start = end;
        end = this.props.article.CONTENT.indexOf("\"", start)
        start = end + 1;
        end = this.props.article.CONTENT.indexOf("\"", start)
        content.push(<Picture name={this.props.article.CONTENT.substring(start, end)} />)
        start = end;
        end = this.props.article.CONTENT.indexOf("/>", start)
        end +=2;
        start = end;
        i++;
      }
    }
    return(
        <div className="newsScreenMain">
            {this.props.article &&
              <div className="newsScreenArticle">

              <img src={process.env.PUBLIC_URL + '/data/backgrounds/'+this.props.article.BACKGROUND} className="newsScreenBackground" />
              <div className="newsScreenTitle">
                {this.props.article.TITLE}
              </div>
              <div className="newsScreenSubtitle">
                {convertedDate.getDate() + '.' + convertedDate.getMonth() + '.' + convertedDate.getFullYear()} - {this.props.article.TYPE}
              </div>
              {
                content.map(element=>
                  (typeof(element) === 'string') ? <div className="newsScreenContent" dangerouslySetInnerHTML={{ __html: element}} />
                  : element
                )
              }
              </div>
            }
          <NewsContainer />
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state.article);
  return {
    article: state.article[0],
  };
};
const mapDispatchToProps = { triggerBar, articleFetched };

export const NewsScreenRedux = connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
const NewsScreenContainer = withTranslation()(NewsScreenRedux);
export default NewsScreenContainer;
