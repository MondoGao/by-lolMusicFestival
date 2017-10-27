import React from 'react';
import cx from 'classnames';

import styles from './App.css';

console.log(styles);

export default function App() {
  return <div className={cx(styles.app)}>hello lol</div>;
}
