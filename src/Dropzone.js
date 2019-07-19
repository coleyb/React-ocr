import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from 'react-bootstrap/Card'

const renderHTML = require('react-render-html');

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  marginBottom: 8,
  marginRight: 8,
  width: 250,
  padding: 4,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      props.onDrop(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const listText = props.translatedText.map((text, index) => {
    files.map((file, fileIndex) => {
      console.log('text', text);
      console.log('file', file);
      if (index === fileIndex) {
        return <div>{renderHTML(text)}</div>
      }
    });
  })

  const thumbs = files.map((file, index) => {
    // This seems like a hack. Needs refactoring
    const listText = props.translatedText.map((text, textIndex) => {
        if (index === textIndex) {
          return <div>{renderHTML(text)}</div>
        }
      });

    return ( <aside style={thumb} key={file.name}>
      <Card>
        <Card.Img variant="top" src={file.preview} alt="uploaded" />
        <Card.Body>
          <Card.Title>Uploaded Image</Card.Title>
          <Card.Text>
            {listText}
          </Card.Text>
        </Card.Body>
      </Card>
    </aside>
  )});

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => {
      URL.revokeObjectURL(file.preview)
    });
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div style={thumbsContainer}>
        {thumbs}
      </div>
    </section>
  );
}

export default Dropzone;