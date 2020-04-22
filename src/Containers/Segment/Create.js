import React, { useState } from 'react';
import { Form, Button, Segment, Input } from 'semantic-ui-react';
import { updateObject } from '../../shared/utility';

const Create = (props) => {
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
    <Segment clearing>
      <Form>
        <Form.Field>
          <label>Oran</label>
          <Input
            placeholder='Oran'
            name='rate'
            value={segment.rate}
            onChange={inputChangedHandler}
          />
        </Form.Field>
        <Form.Field>
          <label>Hedef Frekans</label>
          <Input
            name='targetFrequency'
            placeholder='Hedef Frekans'
            value={segment.targetFrequency}
            onChange={inputChangedHandler}
          />
        </Form.Field>
        <Button
          floated='right'
          positive
          content='Ekle'
          onClick={(e) =>
            props.add(e, {
              rate: segment.rate,
              targetFrequency: segment.targetFrequency,
              deductionDetailId: props.deductionDetailId,
            })
          }
        />
        <Button onClick={props.close} negative floated='right'>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
};

export default Create;
