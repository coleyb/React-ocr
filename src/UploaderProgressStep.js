import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

class UploaderProgressStep extends React.Component {
    render() {
      return (
        <div className="step">
          <div className="status">{this.props.progressStep}</div>
          <ProgressBar animated now={this.props.percentage} />
        </div>
      );
    }
}

export default UploaderProgressStep;