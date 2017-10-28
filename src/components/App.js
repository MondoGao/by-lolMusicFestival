import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import cx from 'classnames';

import styles from './App.css';


export default function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Link to="/">Home</Link>

        <Route exact path="/" render={() => 'Home'}/>
      </div>
    </Router>
  );
}
