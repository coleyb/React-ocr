import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Header } from 'semantic-ui-react';
import FileUploader from './FileUploader';
import AnalyzeText from './AnalyzeText';
import './App.scss';

const App = () => {
  return (
    <Container fluid>
      <Header as='h2'>Convert images to text</Header>
        <FileUploader />
    </Container>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

