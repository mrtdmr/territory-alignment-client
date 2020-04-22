import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { default as PlanListPlaceHolder } from '../../components/plan/listPlaceHolder';
import { Segment, Tab, Table, Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import Aux from '../../hoc/auxiliary/auxiliary';
import { updateObject } from '../../shared/utility';
import { default as SegmentForm } from '../Segment/Create';

const Update = (props) => {
  const {
    onGetPlan,
    onGetTeams,
    onUpdatePlan,
    onOpenModal,
    onCloseModal,
  } = props;
  const [plan, setPlan] = useState({
    id: '',
    name: '',
    active: true,
    deductionMPR: null,
    inductionMPR: null,
    actualMPR: 0.0,
    minimumScope: 0.0,
    created: '',
    teamId: '',
    team: {
      id: '',
      name: '',
    },
    deduction: {
      id: '',
      annualWorkingDay: 0.0,
      monthlyWorkingDay: 0.0,
      dailyVisit: 0.0,
      monthlyVisitCapacity: 0.0,
      monthlyTargetVisitFrequency: 0.0,
      monthlyTargetMPR: 0.0,
      targetedTotalPhysician: 0.0,
      targetedTotalVisit: 0.0,
      averageFrequency: 0.0,
      deductionDetails: [
        {
          segments: [],
        },
      ],
    },
    induction: {
      id: '',
      geographicRatio: null,
      physicianRatio: null,
      inductionDetails: [],
    },
  });

  useEffect(() => {
    if (props.match.params.id)
      onGetPlan(props.match.params.id).then((res) => {
        setPlan(res);
      });
    onGetTeams();
  }, [onGetPlan, props.match.params.id, onGetTeams]);

  const teamOptions = props.teams
    ? props.teams.map((t) => ({
        key: t.id,
        text: t.name,
        value: t.id,
      }))
    : null;

  const planItemChangedHandler = (event, input) => {
    const updatedPlan = updateObject(plan, {
      [input.name]: input.value,
    });
    setPlan(updatedPlan);
  };

  const scopeChangedHandler = (event, input) => {
    const deductionDetail = plan.deduction.deductionDetails.find(
      (dd) => dd.id === input.id
    );
    deductionDetail.scope = input.value;
    //console.log(deductionDetail);
    /*const updatedPlan = updateObject(
      plan,
      updateObject(deductionDetail, { scope: input.value })
    );*/
    console.log(plan);
    //console.log(updatedPlan);
    //setPlan(updatedPlan);
    //console.log(plan);
  };

  const deductionChangedHandler = (event, input) => {
    if (input.name === 'annualWorkingDay') {
      const monthlyWorkingDay = Math.ceil(input.value / 12);
      const monthlyVisitCapacity =
        monthlyWorkingDay * plan.deduction.dailyVisit;
      const updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          annualWorkingDay: input.value,
          monthlyWorkingDay: monthlyWorkingDay,
          monthlyVisitCapacity: monthlyVisitCapacity,
        }),
      });
      setPlan(updatedPlan);
    } else if (input.name === 'dailyVisit') {
      const monthlyVisitCapacity =
        input.value * plan.deduction.monthlyWorkingDay;
      const updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          dailyVisit: input.value,
          monthlyVisitCapacity: monthlyVisitCapacity,
        }),
      });
      setPlan(updatedPlan);
    } else {
      const updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          [input.name]: input.value,
        }),
      });
      setPlan(updatedPlan);
    }
  };
  const openSegmentModal = (event, deductionDetailId) => {
    event.preventDefault();
    console.log(deductionDetailId);
    onOpenModal(
      <SegmentForm
        close={onCloseModal}
        add={addSegmentToDeductionDetail}
        deductionDetailId={deductionDetailId}
      />
    );
  };
  const addSegmentToDeductionDetail = (e, data) => {
    const deductionDetail = plan.deduction.deductionDetails.find(
      (dd) => dd.id === data.deductionDetailId
    );
    deductionDetail.segments.push(data);
    //const updatedPlan = updateObject(plan,{deduction:updateObject(plan.deduction,{deductionDetails:})})
    onCloseModal();
  };
  const panes = [
    {
      menuItem: 'Tümdengelim',
      render: () => (
        <Tab.Pane>
          <Form.Group widths='equal'>
            <Form.Input
              label='Yıllık Net iş Günü'
              fluid
              name='annualWorkingDay'
              placeholder='Yıllık Net iş Günü'
              value={plan.deduction.annualWorkingDay}
              onChange={deductionChangedHandler}
            />
            <Form.Input
              label='Aylık Net iş Günü'
              fluid
              name='monthlyWorkingDay'
              placeholder='Aylık Net iş Günü'
              value={plan.deduction.monthlyWorkingDay}
            />
            <Form.Input
              label='Günlük Ziyaret'
              fluid
              name='dailyVisit'
              placeholder='Günlük Ziyaret'
              value={plan.deduction.dailyVisit}
              onChange={deductionChangedHandler}
            />
            <Form.Input
              label='Aylık Ziyaret Kapasitesi'
              fluid
              name='monthlyVisitCapacity'
              placeholder='Aylık Net iş Günü'
              value={plan.deduction.monthlyVisitCapacity}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='Aylık Hedef  Ziyaret Frekansı/TTT'
              fluid
              name='monthlyTargetVisitFrequency'
              placeholder='Aylık Hedef  Ziyaret Frekansı/TTT'
              value={plan.deduction.monthlyTargetVisitFrequency}
            />
            <Form.Input
              label='Aylık Hedeflenen Tekil/TTT'
              fluid
              name='monthlyTargetMPR'
              placeholder='Aylık Hedeflenen Tekil/TTT'
              value={plan.deduction.monthlyTargetMPR}
            />
            <Form.Input
              label='Hedeflenen Toplam/Takım'
              fluid
              name='targetedTotalPhysician'
              placeholder='Hedeflenen Toplam/Takım'
              value={plan.deduction.targetedTotalPhysician}
            />
            <Form.Input
              label='Hedeflenen Toplam  Ziyaret/Takım'
              fluid
              name='targetedTotalVisit'
              placeholder='Hedeflenen Toplam  Ziyaret/Takım'
              value={plan.deduction.targetedTotalVisit}
            />
          </Form.Group>
          <Form.Group>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Uzmanlık</Table.HeaderCell>
                  <Table.HeaderCell>Hekim Evreni</Table.HeaderCell>
                  <Table.HeaderCell>Kapsanan Evren</Table.HeaderCell>
                  <Table.HeaderCell>Kapsam</Table.HeaderCell>
                  <Table.HeaderCell>Segment Oranı</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {props.plan.deduction.deductionDetails.map((dd) => (
                  <Table.Row key={dd.id}>
                    <Table.Cell>{dd.department.name}</Table.Cell>
                    <Table.Cell>{dd.physicianUniverse.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      {dd.physicianUniverseCovered.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        name='scope'
                        value={dd.scope.toFixed(2)}
                        onChange={(e) => scopeChangedHandler(e, dd)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Table celled>
                        <Table.Body>
                          <Table.Row>
                            {dd.segments.map((s) => (
                              <Table.Cell key={s.id}>
                                {' '}
                                <Form.Input
                                  size='mini'
                                  fluid
                                  name='rate'
                                  value={parseFloat(s.rate).toFixed(2)}
                                />
                              </Table.Cell>
                            ))}
                            <Table.Cell width={1}>
                              <Button
                                icon='add'
                                onClick={(e) => openSegmentModal(e, dd.id)}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Form.Group>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Tümevarım',
      render: () => <Tab.Pane></Tab.Pane>,
    },
  ];

  const updatePlanHandler = () => {
    onUpdatePlan(plan);
  };
  let planUi = props.planLoading ? (
    <PlanListPlaceHolder />
  ) : (
    <Form onSubmit={updatePlanHandler}>
      <Segment>
        <Form.Group widths='equal'>
          <Form.Input
            label='Plan Adı'
            fluid
            name='name'
            placeholder='Ad'
            value={plan.name}
            onChange={planItemChangedHandler}
          />
          <Form.Input
            label='Fiili TTT'
            fluid
            name='actualMPR'
            placeholder='Fiili TTT'
            value={plan.actualMPR}
            onChange={planItemChangedHandler}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='Minimum Kapsam'
            fluid
            name='minimumScope'
            placeholder='Minimum Kapsam'
            value={plan.minimumScope}
            onChange={planItemChangedHandler}
          />
          <Form.Dropdown
            label='Takım'
            fluid
            name='teamId'
            placeholder='Takım Seçiniz...'
            search
            selection
            options={teamOptions}
            value={plan.teamId}
            onChange={planItemChangedHandler}
          />
        </Form.Group>
      </Segment>
      <Segment>
        <Tab panes={panes} />
      </Segment>
      <Segment clearing>
        <Button
          floated='right'
          positive
          type='submit'
          content='Kaydet'
          loading={props.submitting}
        />
        <Button
          //              onClick={() => props.history.goBack()}
          onClick={() => props.history.push('/plans')}
          basic
          color='grey'
          content='Vazgeç'
          floated='right'
        />
      </Segment>
    </Form>
  );
  return <Aux>{planUi}</Aux>;
};
const mapStateToProps = (state) => {
  return {
    teams: state.team.teams,
    teamsLoading: state.team.loading,
    markets: state.market.markets,
    marketsLoading: state.market.loading,
    cities: state.city.cities,
    citiesLoading: state.city.loading,
    departments: state.department.departments,
    departmentsLoading: state.department.loading,
    submitting: state.plan.submitting,
    planLoading: state.plan.loading,
    plan: state.plan.plan,
    open: state.modal.open,
    body: state.modal.body,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTeams: () => dispatch(actions.getTeams()),
    onUpdatePlan: (plan) => dispatch(actions.updatePlan(plan)),
    onGetMarkets: () => dispatch(actions.getMarkets()),
    onGetCities: () => dispatch(actions.getCities()),
    onGetDepartments: () => dispatch(actions.getDepartments()),
    onGetPlan: (id) => dispatch(actions.getPlan(id)),
    onOpenModal: (body) => dispatch(actions.openModal(body)),
    onCloseModal: () => dispatch(actions.closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
