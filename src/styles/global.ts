import {createGlobalStyle} from 'styled-components';
import githubBrackgraund from '../assets/GitHub.svg';

export default createGlobalStyle `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;

}
body{
    background: #f0f0f5 url(${githubBrackgraund}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
}
body,input,button{
    font: 16px Roboto, sans-serif;
}
#root{
    max-width:960px;
    margin:0 auto;
    padding: 40px 20;
}
button{
    cursor: pointer;
}
`;
