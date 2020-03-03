import React from 'react';

export default function Contact({ name, image, mail }) {
  return(
    <div style={style.context}>
        <div style={style.image}>
            <img src={image} height="100%" alt=""/>
        </div>
        <div style={style.name}>
            {mail ?
              <a style={style.mail} href={'mailto:'+name}>{name}</a>
              :name
            }
        </div>
    </div>
  );
}

const style = {
  context: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    margin: '4px',
    background: '#f3f3f3',
    boxSizing: 'border-box',
    boxShadow: '0 3px 2px -1px #222',
    //padding: '2px',
    border: '1px solid black',
  },
  image: {
    height: '100%',
    padding: '3px',
    marginRight: '5px',
    boxSizing: 'border-box',
    borderRight: '1px solid #ccc',
    background: '#e9e9e9',
  },
  name: {
    flex: '1',
    padding: '2px',
    boxSizing: 'border-box',
    fontFamily: 'Fira Sans',
    fontWeight: '700',
  },
  mail: {
    textDecoration: 'none',
    color: 'black',
  }
}
