import React from 'react';
import styled, {injectGlobal } from 'styled-components';

injectGlobal`
    body{
        width:100%;
        height:100vh;
    }
`
const Wrapper = styled.div`
    position:relative;
    height:100%;
    width:100%;
`;
const Content = styled.div`
    position:absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em 1.25em;
    border: 1px solid #babbbc;
    border-radius: 5px;
    background: #f7f7f7;
    text-align: center;
`
class Page404 extends React.Component {
    render() {
        return (
            <Wrapper>
                <Content> 页面未找到 </Content>
            </Wrapper>
        )
    }
}

export default Page404;