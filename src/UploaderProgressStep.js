import React from 'react';
import { Line } from 'rc-progress';

class UploaderProgressStep extends React.Component {
    render() {
      return (
        <div className="step">
          <div className="status">{this.props.progressStep}</div>
          <Line percent={this.props.percentage} strokeWidth="1" strokeColor="#4BCA81" />
        </div>
      );
    }
}

export default UploaderProgressStep;