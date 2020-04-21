import React, { useState } from 'react';
import { Form as SegmentForm, Button } from 'semantic-ui-react';
import { updateObject } from '../../shared/utility';

const Form = () => {
  const [segment, setSegment] = useState({
    rate: 0.0,
    targetFrequency: 0.0,
  });
  const inputChangedHandler = (event, input) => {
    const updatedSegment = updateObject(segment, {
      [input.name]: input.value,
    });
    setSegment(updatedSegment);
  };
  return (
    <SegmentForm.Group widths='equal'>
      <Form.Input
        label='Oran'
        fluid
        name='rate'
        placeholder='Oran'
        value={segment.rate}
        onChange={inputChangedHandler}
      />
      <Form.Input
        label='Hedef Frekans'
        fluid
        name='targetFrequency'
        placeholder='Hedef Frekans'
        value={segment.targetFrequency}
        onChange={inputChangedHandler}
      />
      <Button floated='right' positive type='submit' content='Ekle' />
    </SegmentForm.Group>
  );
};

export default Form;
