import React from 'react';
import { default as InductionDetailItem } from './item';
const list = (props) => {
  return (
    <div>
      {props.inductionDetails.map((id) => (
        <InductionDetailItem id={id} key={id.id} />
      ))}
    </div>
  );
};

export default list;
