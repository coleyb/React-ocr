// import React from 'react';
// import language from '@google-cloud/language';
//
// class AnalyzeText extends React.Component {
//     analyze() {
//
//       // Instantiates a client
//       const client = new language.LanguageServiceClient();
//
//       // The text to analyze
//       const text = 'Hello, world!';
//
//       const document = {
//       content: text,
//       type: 'PLAIN_TEXT',
//       };
//
//       // Detects the sentiment of the text
//       client
//       .analyzeSentiment({document: document})
//       .then(results => {
//         const sentiment = results[0].documentSentiment;
//
//         console.log(`Text: ${text}`);
//         console.log(`Sentiment score: ${sentiment.score}`);
//         console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//       })
//       .catch(err => {
//         console.error('ERROR:', err);
//       });
//     }
//
//     render() {
//       return (
//         <div className="analyze">
//           <button onClick={this.analyze}>Analyze</button>
//         </div>
//       );
//     }
// }
//
// export default AnalyzeText;