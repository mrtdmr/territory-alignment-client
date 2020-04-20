import React from 'react';
import { Placeholder, Segment, Button } from 'semantic-ui-react';

const listPlaceHolder = () => {
    return (
      <Placeholder fluid style={{ marginTop: 50 }}>
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
          <Segment>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Segment>
          <Segment clearing>
            <Button disabled color='blue' floated='right' content='View' />
          </Segment>
        </Segment.Group>
      </Placeholder>
    );
};

export default listPlaceHolder;