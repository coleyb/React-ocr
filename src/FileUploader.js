import React from 'react';
import Dropzone from './Dropzone';
import UploaderProgressStep from './UploaderProgressStep';
import { TesseractWorker } from 'tesseract.js';
import Button from 'react-bootstrap/Button';


const renderHTML = require('react-render-html');
const worker = new TesseractWorker();


class FileUploader extends React.Component {
    constructor(props) {
      super(props);
      this.recognize = this.recognize.bind(this);
      this.progressStep = [];
      this.state = {
        translatedText: [],
        translatedWords: [],
        progress: 0,
        progressStep: [],
        isLoading: false
       };
       this.baseState = this.state;
    }

    recognize(images) {
        this.setState(this.baseState);
        this.setState({ isLoading: true });
        let t0 = performance.now();
        console.log(Date.now());
        console.log('Button was clicked!');
        images.forEach(image => {
          console.log('image', image);
          worker.recognize(image, 'eng')
          .progress(progress => {
            this.setState({ progressStep: progress.status })
            this.setState({ progress: Math.round(progress.progress * 100) })
          }).then(result => {
            console.log('result', result);
            this.setState({ isLoading: false });
            this.setState({ progressStep: this.progressStep});
            this.setState({ translatedText: [...this.state.translatedText, result.hocr] })
            this.setState({ translatedWords: [...this.state.translatedWords, result.words] })
            console.log('this.state.translatedWords', this.state.translatedWords);
            var t1 = performance.now();
            console.log("Conversion took: " + (t1 - t0) + " milliseconds.")
          });
        });
    }

    render() {
      const listWords = this.state.translatedWords.map((w, index) => {
        w.map((m, index) => {
          let confidence = 'certain';
          if (w.confidence > 90) {
            confidence = 'certain';
          }
          else if (w.confidence > 75 && w.confidence <= 90) {
            confidence = 'uncertain';
          }
          else if (w.confidence < 75) {
            confidence = 'unlikely';
          }
          return <div className={"inner " + (confidence)}  key={index}>{w.text}</div>
        })
      })

      let uploader;
      if (this.state.isLoading) {
        uploader = <UploaderProgressStep progressStep={this.state.progressStep} percentage={this.state.progress} />
      }
    return (
        <div className="uploader">
          <Dropzone onDrop={this.recognize} translatedText={this.state.translatedText} />
          <Button disabled={this.state.isLoading} onClick={this.recognize}>{this.state.isLoading ? 'Processing…' : 'Recognize'}</Button>
          {uploader}
          <div className="word-wrap">
            {listWords}
          </div>
        </div>
    );
  }
}

export default FileUploader;