import React from 'react';
import Dropzone from './Dropzone';
import { TesseractWorker } from 'tesseract.js';
import Button from 'react-bootstrap/Button';


const renderHTML = require('react-render-html');
const worker = new TesseractWorker();


class FileUploader extends React.Component {
    constructor(props) {
      super(props);
      this.recognizeImages = this.recognizeImages.bind(this);
      this.state = {
        test: '',
        progress: '',
        translatedText: [],
        translatedWords: [],
        isLoading: false
       };
       this.baseState = this.state;
    }

    // Iterate over uploading images
    recognizeImages(images) {
      this.setState(this.baseState);
      this.setState({ isLoading: true });
      images.forEach((image, index) => {
        this.recognizeImage(image, index);
      });
    }

    // Add progress and image recognition to state here
    recognizeImage(image, index) {
      let t0 = performance.now();
      worker.recognize(image, 'eng')
      .progress(progress => {
        console.warn('starting processing image', index);
        this.setState({progress: [{
          imageIndex: index,
          progressStatus: progress.status,
          progress: Math.round(progress.progress * 100)
        }]});
      }).then(result => {
        this.setState({test: [...this.state.test, {imageIndex: index, result}]});
        this.setState({ isLoading: false });
        this.setState({ progressStep: this.progressStep});
        this.setState({ translatedText: [...this.state.translatedText, result.hocr] });
        this.setState({ translatedWords: [...this.state.translatedWords, result.words] });
        this.setState({progress: []});
        var t1 = performance.now();
        console.log('this.state', this.state);
        console.log("Conversion took: " + (t1 - t0) + " milliseconds.")
        console.warn('finished processing image', index);
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

    return (
        <div className="uploader">
          <Dropzone onDrop={this.recognizeImages} translatedText={this.state.translatedText} progress={this.state.progress} />
          <Button disabled={this.state.isLoading} onClick={this.recognizeImages}>{this.state.isLoading ? 'Processing…' : 'Recognize'}</Button>
          <div className="word-wrap">
            {listWords}
          </div>
        </div>
    );
  }
}

export default FileUploader;