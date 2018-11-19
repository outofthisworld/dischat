import React, { Component } from 'react';
import logo from './logo.svg';
import Chat from './components/Chat';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Chat/> 
        <style jsx global>
          {
            `
                @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
                html,body,#root{
                  height:100%;
                  font-family: 'Roboto', sans-serif;
                  font-size:62.5%;
                }
                body{
                  height:100%;
                }
                ul{
                  margin:0;
                  padding:0;
                  list-style-type:none;
                  text-align:center;
                }
            `
          }
        </style>
      </React.Fragment>
    );
  }
}

export default App;
