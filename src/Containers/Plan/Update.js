import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { default as PlanListPlaceHolder } from '../../components/plan/listPlaceHolder';
import {
  Segment,
  Tab,
  Table,
  Button,
  Label,
  Container,
} from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import Aux from '../../hoc/auxiliary/auxiliary';
import { updateObject } from '../../shared/utility';

const Update = (props) => {
  const { onGetPlan, onGetTeams, onUpdatePlan } = props;
  const [plan, setPlan] = useState({
    id: '',
    name: '',
    active: true,
    deductionMPR: 0.0,
    inductionMPR: 0.0,
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
          id: '',
          physicianUniverse: 0.0,
          physicianUniverseCovered: 0.0,
          scope: 0.0,
          scopeCount: 0.0,
          departmentId: '',
          department: {
            id: '',
            name: '',
          },
          segments: [
            {
              id: '',
              rate: 0.0,
              targetCount: 0.0,
              targetFrequency: 0.0,
              visit: 0.0,
            },
          ],
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
  const scopeChangedHandler = (event, ddIndex) => {
    plan.deduction.deductionDetails[ddIndex].scope = event.target.value;
    plan.deduction.deductionDetails[ddIndex].segments.forEach((segment) => {
      segment.targetCount =
        (plan.deduction.deductionDetails[ddIndex].physicianUniverse *
          plan.deduction.deductionDetails[ddIndex].physicianUniverseCovered *
          segment.rate *
          event.target.value) /
        1000000;
      segment.visit = segment.targetCount * segment.targetFrequency;
    });
    setPlan(plan);
    calcDeductionValues();
  };
  const segmentChangedHandler = (event, sIndex, deductionDetail) => {
    const deductionDetailIndex = plan.deduction.deductionDetails.findIndex(
      (dd) => dd.id === deductionDetail.id
    );
    if (deductionDetailIndex < 0) return;
    plan.deduction.deductionDetails[deductionDetailIndex].segments[
      sIndex.index
    ].rate = event.target.value;
    plan.deduction.deductionDetails[deductionDetailIndex].segments[
      sIndex.index
    ].targetCount =
      (deductionDetail.physicianUniverse *
        deductionDetail.physicianUniverseCovered *
        deductionDetail.scope *
        event.target.value) /
      1000000;
    plan.deduction.deductionDetails[deductionDetailIndex].segments[
      sIndex.index
    ].visit =
      plan.deduction.deductionDetails[deductionDetailIndex].segments[
        sIndex.index
      ].targetCount *
      plan.deduction.deductionDetails[deductionDetailIndex].segments[
        sIndex.index
      ].targetFrequency;
    setPlan(plan);
    calcDeductionValues();
  };
  const targetFrequencyChangedHandler = (event, sIndex, deductionDetail) => {
    const deductionDetailIndex = plan.deduction.deductionDetails.findIndex(
      (dd) => dd.id === deductionDetail.id
    );
    if (deductionDetailIndex < 0) return;
    plan.deduction.deductionDetails[deductionDetailIndex].segments[
      sIndex.index
    ].targetFrequency = event.target.value;
    plan.deduction.deductionDetails[deductionDetailIndex].segments[
      sIndex.index
    ].visit =
      plan.deduction.deductionDetails[deductionDetailIndex].segments[
        sIndex.index
      ].targetCount * event.target.value;

    const updatedPlan = updateObject(plan, {
      deduction: updateObject(plan.deduction, {
        deductionDetails: [...plan.deduction.deductionDetails],
      }),
    });
    setPlan(updatedPlan);
    calcDeductionValues();
  };
  const deductionChangedHandler = (event, input) => {
    if (input.name === 'annualWorkingDay') {
      const monthlyWorkingDay = Math.ceil(input.value / 12);
      plan.deduction.monthlyWorkingDay = monthlyWorkingDay;
      const monthlyVisitCapacity =
        monthlyWorkingDay * plan.deduction.dailyVisit;
      plan.deduction.monthlyVisitCapacity = monthlyVisitCapacity;
      plan.deduction.annualWorkingDay = input.value;
      setPlan(plan);
    } else if (input.name === 'dailyVisit') {
      const monthlyVisitCapacity =
        input.value * plan.deduction.monthlyWorkingDay;
      plan.deduction.monthlyVisitCapacity = monthlyVisitCapacity;
      plan.deduction.dailyVisit = input.value;
      setPlan(plan);
    }
    calcDeductionValues();
  };
  const addSegment = (e, id) => {
    e.preventDefault();
    const deductionDetail = plan.deduction.deductionDetails.find(
      (dd) => dd.id === id
    );
    deductionDetail.segments.push({
      rate: 0,
      targetCount: 0,
      targetFrequency: 0,
      visit: 0,
    });
    const updatedPlan = updateObject(plan, {
      deduction: updateObject(plan.deduction, {
        deductionDetails: [...plan.deduction.deductionDetails],
      }),
    });

    setPlan(updatedPlan);
    console.log('plan', plan);
  };
  const removeSegment = (e, index, id) => {
    e.preventDefault();
    const deductionDetail = plan.deduction.deductionDetails.find(
      (dd) => dd.id === id
    );
    deductionDetail.segments.splice(index.index, 1);
    const updatedPlan = updateObject(plan, {
      deduction: updateObject(plan.deduction, {
        deductionDetails: [...plan.deduction.deductionDetails],
      }),
    });
    setPlan(updatedPlan);
    calcDeductionValues();
  };
  const calcTotal = (items, prp) => {
    return items.reduce((a, b) => {
      return a + b[prp];
    }, 0);
  };
  const calcDeductionValues = (a, b) => {
    let totalVisit = 0;
    let totalTargetCount = 0;
    plan.deduction.deductionDetails.forEach((dd) => {
      totalVisit += calcTotal(dd.segments, 'visit');
      totalTargetCount += calcTotal(dd.segments, 'targetCount');
    });

    if (totalTargetCount === 0) totalTargetCount = 1;
    const monthlyTargetVisitFrequency = (totalVisit / totalTargetCount).toFixed(
      2
    );
    const monthlyTargetMPR = (parseInt(monthlyTargetVisitFrequency) === 0
      ? 0
      : plan.deduction.monthlyVisitCapacity / monthlyTargetVisitFrequency
    ).toFixed(2);

    const updatedPlan = updateObject(plan, {
      deduction: updateObject(plan.deduction, {
        monthlyTargetVisitFrequency: monthlyTargetVisitFrequency,
        monthlyTargetMPR: monthlyTargetMPR,
        targetedTotalPhysician: totalTargetCount,
        targetedTotalVisit: totalVisit,
      }),
      deductionMPR: (totalVisit / plan.deduction.monthlyVisitCapacity).toFixed(
        2
      ),
    });
    setPlan(updatedPlan);
  };
  const panes = [
    {
      menuItem: 'Tümdengelim',
      render: () => (
        <Tab.Pane>
          <Form.Group widths='equal'>
            <Form.Input
              label='Yıllık Net iş Günü'
              error
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
              error
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
              value={plan.deduction.targetedTotalPhysician.toFixed(2)}
            />
            <Form.Input
              label='Hedeflenen Toplam  Ziyaret/Takım'
              fluid
              name='targetedTotalVisit'
              placeholder='Hedeflenen Toplam  Ziyaret/Takım'
              value={plan.deduction.targetedTotalVisit.toFixed(2)}
            />
          </Form.Group>
          <Form.Group>
            <Table striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Uzmanlık</Table.HeaderCell>
                  <Table.HeaderCell>Hekim Evreni</Table.HeaderCell>
                  <Table.HeaderCell>Kapsanan Evren</Table.HeaderCell>
                  <Table.HeaderCell>Kapsam</Table.HeaderCell>
                  <Table.HeaderCell>
                    Segment Oranı/Hedef Hekim/Hedef Frekans/Ziyaret
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {plan.deduction.deductionDetails.map((dd, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{dd.department.name}</Table.Cell>
                    <Table.Cell>{dd.physicianUniverse.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      {dd.physicianUniverseCovered.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        error
                        name='scope'
                        value={dd.scope}
                        onChange={(e) => scopeChangedHandler(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Table celled>
                        <Table.Body>
                          <Table.Row>
                            {dd.segments.map((s, index) => (
                              <Table.Cell key={index}>
                                {' '}
                                <Form.Input
                                  label='Segment Oranı'
                                  size='mini'
                                  error
                                  name='rate'
                                  value={s.rate}
                                  onChange={(e) =>
                                    segmentChangedHandler(e, { index }, dd)
                                  }
                                  action={{
                                    icon: 'remove',
                                    onClick: (e) =>
                                      removeSegment(e, { index }, dd.id),
                                  }}
                                />
                                <Form.Input
                                  label='Hedef Hekim'
                                  size='mini'
                                  fluid
                                  name='targetCount'
                                  value={s.targetCount?.toFixed(2)}
                                />
                                <Form.Input
                                  label='Hedef Frekans'
                                  size='mini'
                                  error
                                  name='targetFrequency'
                                  value={s.targetFrequency}
                                  onChange={(e) =>
                                    targetFrequencyChangedHandler(
                                      e,
                                      { index },
                                      dd
                                    )
                                  }
                                />
                                <Form.Input
                                  label='Ziyaret'
                                  size='mini'
                                  fluid
                                  name='visit'
                                  value={s.visit?.toFixed(2)}
                                />
                              </Table.Cell>
                            ))}
                            <Table.Cell width={1}>
                              <Button
                                icon='add'
                                onClick={(e) => addSegment(e, dd.id)}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <Segment basic>
                        <Label as='a' basic size='medium' color='green'>
                          Ziyaret Toplamı:{' '}
                          {calcTotal(dd.segments, 'visit').toFixed(2)}
                        </Label>

                        <Label as='a' basic size='medium' color='blue'>
                          Kapsam Toplamı:{' '}
                          {calcTotal(dd.segments, 'targetCount').toFixed(2)}
                        </Label>
                        <Label as='a' basic size='medium' color='red'>
                          Ortalama Frekans:{' '}
                          {(
                            calcTotal(dd.segments, 'visit').toFixed(2) /
                            (parseInt(
                              calcTotal(dd.segments, 'targetCount').toFixed(2)
                            ) === 0
                              ? 1
                              : calcTotal(dd.segments, 'targetCount').toFixed(
                                  2
                                ))
                          ).toFixed(2)}
                        </Label>
                      </Segment>
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
    <Container style={{ width: '90%', margin: '7em auto' }}>
      <PlanListPlaceHolder />
    </Container>
  ) : (
    <Form
      onSubmit={updatePlanHandler}
      style={{ width: '90%', margin: '7em auto' }}
    >
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
        <Form.Group widths='equal'>
          <Form.Input
            label='TÜMDENGELİM YÖNDETMİ İLE HESAPLANAN TTT SAYISI:'
            name='deductionMPR'
            value={plan.deductionMPR ? plan.deductionMPR : 0}
          />
          <Form.Input
            label='TÜMEVARIM YÖNDETMİ İLE HESAPLANAN TTT SAYISI:'
            name='inductionMPR'
            value={plan.inductionMPR ? plan.inductionMPR : 0}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
