import React, { Component } from 'react'
import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Layout>
        </Layout>
      </BrowserRouter>

    );
  }
}

export default App;
