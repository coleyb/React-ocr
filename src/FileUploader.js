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
        translatedText: '',
        translatedWords: [],
        uploadedImage: null,
        progress: 0,
        progressStep: [],
        isLoading: false
       };
    }

    recognize(image) {
        this.setState({ isLoading: true });
        this.setState({ uploadedImage: image.path })
        let t0 = performance.now();
        console.log(Date.now());
        console.log('Button was clicked!');
        worker.recognize(image, 'eng')
        .progress(progress => {
          this.setState({ progressStep: progress.status })
          this.setState({ progress: Math.round(progress.progress * 100) })
        }).then(result => {
          this.setState({ isLoading: false });
          this.setState({ progressStep: this.progressStep});
          this.setState({ translatedText: result.hocr});
          this.setState({ translatedWords: result.words});
          var t1 = performance.now();
          console.log("Conversion took: " + (t1 - t0) + " milliseconds.")
          worker.terminate();
        });
    }

    render() {
      const listWords = this.state.translatedWords.map((w, index) => {
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

      let uploader;
      if (this.state.isLoading) {
        uploader = <UploaderProgressStep progressStep={this.state.progressStep} percentage={this.state.progress} />
      }
    return (
        <div className="uploader">
          <Dropzone onDrop={this.recognize} />
          <Button disabled={this.state.isLoading} onClick={this.recognize}>{this.state.isLoading ? 'Processing…' : 'Recognize'}</Button>
          {uploader}
          <div className="word-wrap">
            {listWords}
          </div>
          <div>{renderHTML(this.state.translatedText)}</div>
        </div>
    );
  }
}

export default FileUploader;