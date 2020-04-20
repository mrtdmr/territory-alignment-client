import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const loading = (props) => {
  return (
    <Dimmer active inverted>
      <Loader content={props.content} />
    </Dimmer>
  );
};

export default loading;
