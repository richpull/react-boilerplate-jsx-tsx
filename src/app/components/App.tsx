import * as React from 'react';

import { Inner } from './Inner';
import { TestObjectStyle } from './testObjectStyle';

const App = () => {
  return (
    <div className="wrapper">
      <h1>Hello. I am Wrapper</h1>
      <div>
        My css-{'>'} <span style={TestObjectStyle.badgeInline}>main.scss</span>
      </div>
      <Inner title="I am Inner Component" />
      <img src="img/react-image.png" alt="" />
    </div>
  );
};

export { App };
