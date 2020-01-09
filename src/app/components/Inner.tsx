import * as React from 'react';

import { Children } from './Children';

import styled from 'styled-components';

const InnerContainer = styled.section`
  border: 1px solid #ccc;
  margin: 50px;
  padding: 50px;
`;

interface InnerProps {
  title: string;
}

const Inner: React.FC<InnerProps> = props => {
  return (
    <InnerContainer>
      <h1>{props.title}</h1>
      <div>My css-{'>'} children.css</div>
      <Children />
    </InnerContainer>
  );
};
export { Inner };
