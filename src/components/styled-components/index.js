import React from 'react';
import styled, { injectGlobal, keyframes } from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em

// 注入全局样式
injectGlobal`
    body{
        font-family: sans-serif;
        height: 100%;
        background: palevioletred;
    }
`
const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    animation: ${keyframes`from { opacity: 0; }`} 5s both;
  `;
const Wrapper = styled.div`
    padding: 4em;
    background: green;
`;
const Input = styled.input`
  font-size: 1.25em;
  border: none;
  background: papayawhip;
 
  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }

  @media (min-width: 1450px) {
    font-size: 1.5em;
  }
`;
 class styledComponents extends React.Component{

    render() {
        return (
            <Wrapper>
                <Title>test styledComponents</Title>
                <Input />
            </Wrapper>
        )
    }
}

export default styledComponents;