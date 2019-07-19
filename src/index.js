import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Header } from 'semantic-ui-react';
import FileUploader from './FileUploader';
import AnalyzeText from './AnalyzeText';
import './App.scss';

const App = () => {
  return (
    <Container>
      <Header as='h2'>Convert images to text</Header>
        <FileUploader />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
    </Container>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

