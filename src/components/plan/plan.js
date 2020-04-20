import React from 'react';
import { Segment, Item, Icon, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../shared/utility';

const plan = props => {
  return <Segment.Group>
    <Segment clearing>
      <Item.Group>
        <Item>
          <Item.Content><Icon name='edit outline' />
            <Item.Header>{props.plan.name}</Item.Header>
            <Item.Description><Icon name="calendar alternate" />
              {formatDate(props.plan.created)}
            </Item.Description>
            <Divider horizontal><Icon name="users" />&nbsp;&nbsp;{props.plan.team.name}</Divider>
            <Item.Description>Fiili TTT sayısı :{props.plan.actualMPR}</Item.Description>
            <Item.Description>Tümdengelim TTT sayısı :{props.plan.deductionMPR ? props.plan.deductionMPR : "Hesaplanmadı"}</Item.Description>
            <Item.Description>Tümevarım TTT sayısı :{props.plan.inductionMPR ? props.plan.deductionMPR : "Hesaplanmadı"}</Item.Description>
            <Item.Description>Minimum Kapsam :{props.plan.minimumScope ? props.plan.minimumScope : "Girilmedi"}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Segment clearing>
      <Button
        as={Link}
        to={`/update-plan/${props.plan.id}`}
        floated='right'
        content='Güncelle'
        color='orange'
      />
      <Button
        as={Link}
        to={`/plans/${props.plan.id}`}
        floated='right'
        content='Detay'
        color='blue'
      />
    </Segment>
  </Segment.Group>
};

export default plan;
