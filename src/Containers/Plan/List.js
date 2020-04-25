import React, { useEffect } from 'react';
import * as actions from '../../store/actions/index';
import { default as PlanListPlaceHolder } from '../../components/plan/listPlaceHolder';
import { connect } from 'react-redux';
import { default as Plan } from '../../components/plan/plan';
import { Grid, Container } from 'semantic-ui-react';

const List = (props) => {
  const { onGetPlans } = props;
  useEffect(() => {
    onGetPlans();
  }, [onGetPlans]);

  let plans = props.plansLoading ? (
    <PlanListPlaceHolder />
  ) : (
    props.plans.map((p) => <Plan key={p.id} plan={p} />)
  );

  return (
    <Container style={{ marginTop: '7em' }}>
      <Grid>
        <Grid.Column width={10}>{plans}</Grid.Column>
      </Grid>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    plans: state.plan.plans,
    plansLoading: state.plan.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPlans: () => dispatch(actions.getPlans()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
