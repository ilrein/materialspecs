import React from 'react'
import Dropzone from 'react-dropzone'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

class Upload extends React.Component {
  render() {
    return (
      <Dropzone>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Segment placeholder>
                <Header icon>
                    <Icon name='pdf file outline' /></Header>
                <Button primary>Add Document</Button>
            </Segment>

          </div>
        )}
      </Dropzone>
    )
  }
}

export default Upload;
