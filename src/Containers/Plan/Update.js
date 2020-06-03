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
  Icon,
  Confirm,
} from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import Aux from '../../hoc/auxiliary/auxiliary';
import { updateObject } from '../../shared/utility';
import { default as InductionDetailsList } from '../../components/inductionDetail/list';
import { toast } from 'react-toastify';
import { default as InductionDetailItem } from '../../components/inductionDetail/item';
const Update = (props) => {
  const {
    onGetPlan,
    onGetTeams,
    onUpdatePlan,
    onGetDepartments,
    onOpenModal,
    onDeletePlan,
  } = props;
  const [plan, setPlan] = useState({
    id: '',
    name: '',
    deductionMPR: 0.0,
    inductionMPR: 0.0,
    actualMPR: 0.0,
    minimumScope: 0.0,
    planPeriod: {
      name: '',
    },
    dataPeriod: {
      name: '',
    },
    teamId: 0,
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
      geographicRatio: 0.0,
      physicianRatio: 0.0,
      inductionDetails: [
        {
          id: '',
          market: 0.0,
          marketGeographicRatio: 0.0,
          physicianCount: 0.0,
          physicianGeographicRatio: 0.0,
          weightedGeographicRatio: 0.0,
          scopeWeightedGeographicRatio: 0.0,
          cityTotalPhysicianScoped: 0.0,
          cityId: '',
          city: {
            id: '',
            name: '',
          },
          departments: [
            {
              id: '',
              name: '',
              cityPhysician: 0.0,
              cityPhysicianScoped: 0.0,
            },
          ],
        },
      ],
    },
  });
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [target, setTarget] = useState(undefined);
  useEffect(() => {
    if (props.match.params.id)
      onGetPlan(props.match.params.id).then((res) => {
        setPlan(res);
        onGetDepartments(props.match.params.id).then((res) => {
          setDepartments(res);
        });
        onGetTeams();
      });
  }, [onGetPlan, onGetDepartments, onGetTeams, props.match.params.id]);
  const teamOptions = props.teams
    ? props.teams.map((t) => ({
        key: t.id,
        text: t.name,
        value: t.id,
      }))
    : null;
  const departmentOptions = props.departments
    ? departments.map((t) => ({
        key: t.id,
        text: t.name,
        value: t.id,
      }))
    : null;
  const inputActionHandler = (e, a, i1, i2) => {
    if (a === 'addS') inputChangedHandler(e, { name: 'addS' }, i1, i2);
    else if (a === 'removeS')
      inputChangedHandler(e, { name: 'removeS' }, i1, i2);
    else if (a === 'removeDD')
      inputChangedHandler(e, { name: 'removeDD' }, i1, i2);
  };
  const calcTotal = (items, prp) => {
    return items.reduce((a, b) => {
      return a + b[prp];
    }, 0);
  };
  const inputChangedHandler = (event, input, index1, index2) => {
    event.preventDefault();
    let updatedPlan = {};
    let totalVisit = 0;
    let totalTargetCount = 0;
    let cityPhysicianUniverseCovered = 0;
    let totalPhysicianUniverseCovered = 0;
    let totalPhysicianScopedCount = 0;

    if (input.name === 'annualWorkingDay') {
      const updatedDeduction = updateObject(plan.deduction, {
        annualWorkingDay: input.value,
      });
      updatedPlan = updateObject(plan, { deduction: updatedDeduction });
    } else if (input.name === 'dailyVisit') {
      const updatedDeduction = updateObject(plan.deduction, {
        dailyVisit: input.value,
      });
      updatedPlan = updateObject(plan, { deduction: updatedDeduction });
    } else if (input.name === 'scope') {
      const updatedDeductionDetails = [...plan.deduction.deductionDetails];
      updatedDeductionDetails[index1].scope = input.value;
      updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          deductionDetails: [...updatedDeductionDetails],
        }),
      });
    } else if (input.name === 'rate') {
      const updatedDeductionDetails = [...plan.deduction.deductionDetails];
      updatedDeductionDetails[index1].segments[index2].rate = input.value;
      updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          deductionDetails: [...updatedDeductionDetails],
        }),
      });
    } else if (input.name === 'targetFrequency') {
      const updatedDeductionDetails = [...plan.deduction.deductionDetails];
      updatedDeductionDetails[index1].segments[index2].targetFrequency =
        input.value;
      updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          deductionDetails: [...updatedDeductionDetails],
        }),
      });
    } else if (input.name === 'removeS') {
      const updatedDeductionDetails = [...plan.deduction.deductionDetails];
      updatedDeductionDetails[index1].segments.splice(index2, 1);
      updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          deductionDetails: [...updatedDeductionDetails],
        }),
      });
    } else if (input.name === 'addS') {
      const updatedDeductionDetails = [...plan.deduction.deductionDetails];
      updatedDeductionDetails[index1].segments.push({
        rate: 0,
        targetCount: 0,
        targetFrequency: 0,
        visit: 0,
      });
      updatedPlan = updateObject(plan, {
        deduction: updateObject(plan.deduction, {
          deductionDetails: [...updatedDeductionDetails],
        }),
      });
    } else if (input.name === 'removeDD') {
      const updatedDeduction = { ...plan.deduction };
      const updatedInduction = { ...plan.induction };
      const deductionDetail = updatedDeduction.deductionDetails[index1];
      updatedInduction.inductionDetails.forEach((id) => {
        id.departments = id.departments.filter(
          (d) => d.id !== deductionDetail.departmentId
        );
      });
      updatedDeduction.deductionDetails.splice(index1, 1);
      updatedPlan = updateObject(plan, {
        deduction: updatedDeduction,
        induction: updatedInduction,
      });
    } else if (input.name === 'geographicRatio') {
      updatedPlan = updateObject(plan, {
        induction: updateObject(plan.induction, {
          geographicRatio: input.value,
        }),
      });
    } else if (input.name === 'physicianRatio') {
      updatedPlan = updateObject(plan, {
        induction: updateObject(plan.induction, {
          physicianRatio: input.value,
        }),
      });
    } else {
      updatedPlan = updateObject(plan, {
        [input.name]: input.value,
      });
    }
    const monthlyWorkingDay = Math.ceil(
      updatedPlan.deduction.annualWorkingDay / 12
    );
    const monthlyVisitCapacity =
      monthlyWorkingDay * updatedPlan.deduction.dailyVisit;
    updatedPlan.deduction.monthlyWorkingDay = monthlyWorkingDay;
    updatedPlan.deduction.monthlyVisitCapacity = monthlyVisitCapacity;

    updatedPlan.induction.inductionDetails.forEach((id) => {
      id.weightedGeographicRatio =
        (id.marketGeographicRatio * updatedPlan.induction.geographicRatio +
          id.physicianGeographicRatio * updatedPlan.induction.physicianRatio) /
        100;
    });
    totalPhysicianScopedCount = 0;
    updatedPlan.induction.inductionDetails.forEach((id) => {
      id.cityTotalPhysicianScoped = 0;
      id.departments.forEach((d) => {
        const scope = updatedPlan.deduction.deductionDetails.find(
          (dd) => dd.departmentId === d.id
        ).scope; // Seçilen uzamnlıkların tümdengelimde girilen kapsamlarının bulunduğu kısım.
        d.cityPhysicianScoped = (d.cityPhysician * scope) / 100; // tümdengelimde girilen kapsama göre uzmanlık için kapsanan hekim sayının bulunduğu kısım.
        id.cityTotalPhysicianScoped += d.cityPhysicianScoped; //tümdengelimde girilen kapsama göre o il için seçilen tüm uzmanlıkların hekim sayılarının toplandığı kısım
        totalPhysicianScopedCount += d.cityPhysicianScoped;
      });
    });
    updatedPlan.induction.inductionDetails.forEach((id) => {
      id.scopeWeightedGeographicRatio =
        totalPhysicianScopedCount === 0
          ? 0
          : (id.marketGeographicRatio * updatedPlan.induction.geographicRatio +
              (id.cityTotalPhysicianScoped / totalPhysicianScopedCount) *
                100 *
                updatedPlan.induction.physicianRatio) /
            100;
    });
    updatedPlan.deduction.deductionDetails.forEach((dd) => {
      dd.physicianUniverseCovered = 0;
      updatedPlan.induction.inductionDetails.forEach((id) => {
        const cityPhysician = id.departments.find(
          (d) => d.id === dd.departmentId
        ).cityPhysician;
        totalPhysicianUniverseCovered += cityPhysician;
        if (id.weightedGeographicRatio > updatedPlan.minimumScope) {
          cityPhysicianUniverseCovered += cityPhysician;
        }
      });
      dd.physicianUniverseCovered =
        (cityPhysicianUniverseCovered / totalPhysicianUniverseCovered) * 100;
    });

    updatedPlan.deduction.deductionDetails.forEach((dd) => {
      dd.segments.forEach((segment) => {
        segment.targetCount =
          (dd.physicianUniverse *
            dd.physicianUniverseCovered *
            segment.rate *
            dd.scope) /
          1000000;
        segment.visit = segment.targetCount * segment.targetFrequency;
      });
    });

    updatedPlan.deduction.deductionDetails.forEach((dd) => {
      totalVisit += calcTotal(dd.segments, 'visit');
      totalTargetCount += calcTotal(dd.segments, 'targetCount');
    });

    const monthlyTargetVisitFrequency =
      totalVisit / (totalTargetCount === 0 ? 1 : totalTargetCount);

    const monthlyTargetMPR =
      parseInt(monthlyTargetVisitFrequency) === 0
        ? 0
        : updatedPlan.deduction.monthlyVisitCapacity /
          monthlyTargetVisitFrequency;
    updatedPlan.deduction.monthlyTargetVisitFrequency = monthlyTargetVisitFrequency;
    updatedPlan.deduction.monthlyTargetMPR = monthlyTargetMPR;
    updatedPlan.deduction.targetedTotalPhysician = totalTargetCount;
    updatedPlan.deduction.targetedTotalVisit = totalVisit;
    parseFloat(updatedPlan.deduction.monthlyVisitCapacity) === 0
      ? (updatedPlan.deductionMPR = 0)
      : (updatedPlan.deductionMPR =
          totalVisit / updatedPlan.deduction.monthlyVisitCapacity);
    updatedPlan.inductionMPR = 0;
    updatedPlan.induction.inductionDetails.forEach((id) => {
      if (id.weightedGeographicRatio > updatedPlan.minimumScope) {
        parseFloat(updatedPlan.deduction.monthlyTargetMPR) === 0
          ? (updatedPlan.inductionMPR = 0)
          : (updatedPlan.inductionMPR +=
              id.cityTotalPhysicianScoped /
              updatedPlan.deduction.monthlyTargetMPR);
      }
    });
    if (input.name === 'removeDD') {
      onUpdatePlan(updatedPlan).then(() => {
        onGetPlan(updatedPlan.id).then((res) => {
          setPlan(res);
          onGetDepartments(updatedPlan.id).then((res) => {
            setSelectedDepartment('');
            setDepartments(res);
          });
        });
      });
    }
    setPlan(updatedPlan);
  };
  const sortBy = (e, sortProp) => {
    const updatedInductionDetails = [...plan.induction.inductionDetails];
    updatedInductionDetails.sort(function (a, b) {
      return b[sortProp] - a[sortProp];
    });

    const updatedPlan = updateObject(plan, {
      induction: updateObject(plan.induction, {
        inductionDetails: [...updatedInductionDetails],
      }),
    });
    updatedPlan.inductionMPR = 0;
    updatedPlan.induction.inductionDetails.forEach((id) => {
      if (id[sortProp] > updatedPlan.minimumScope) {
        parseFloat(updatedPlan.deduction.monthlyTargetMPR) === 0
          ? (updatedPlan.inductionMPR = 0)
          : (updatedPlan.inductionMPR +=
              id.cityTotalPhysicianScoped /
              updatedPlan.deduction.monthlyTargetMPR);
      }
    });
    setPlan(updatedPlan);
  };
  const departmentDropdownChangedHandler = (event, input) => {
    if (input.value !== '') setAddButtonDisabled(false);
    else setAddButtonDisabled(true);
    setSelectedDepartment(input.value);
  };
  const getInductionDetails = (e, idIndex) => {
    const induction = plan.induction.inductionDetails[idIndex];
    e.preventDefault();
    onOpenModal(<InductionDetailItem id={induction} />);
  };
  const addDepartmentToPlanHandler = (event) => {
    event.preventDefault();
    const updatedPlan = { ...plan };
    updatedPlan.deduction.deductionDetails.push({
      physicianUniverse: 0.0,
      physicianUniverseCovered: 0.0,
      scope: 0.0,
      scopeCount: 0.0,
      departmentId: selectedDepartment,
      department: {
        id: selectedDepartment,
        name: '',
      },
      segments: [],
    });
    setPlan(updatedPlan);
    onUpdatePlan(plan).then(() => {
      onGetPlan(plan.id).then((res) => {
        setPlan(res);
        onGetDepartments(plan.id).then((res) => {
          setSelectedDepartment('');
          setAddButtonDisabled(true);
          setDepartments(res);
        });
      });
    });
  };
  const showConfirm = (event) => {
    event.preventDefault();
    setConfirm(true);
  };
  const closeConfirm = (event) => {
    event.preventDefault();
    setConfirm(false);
  };
  const deletePlanHandler = (event) => {
    event.preventDefault();
    setConfirm(false);
    onDeletePlan(plan.id);
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
              onChange={inputChangedHandler}
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
              onChange={inputChangedHandler}
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
              value={parseFloat(
                plan.deduction.monthlyTargetVisitFrequency
              ).toFixed(2)}
            />
            <Form.Input
              label='Aylık Hedeflenen Tekil/TTT'
              fluid
              name='monthlyTargetMPR'
              placeholder='Aylık Hedeflenen Tekil/TTT'
              value={parseFloat(plan.deduction.monthlyTargetMPR).toFixed(2)}
            />
            <Form.Input
              label='Hedeflenen Toplam/Takım'
              fluid
              name='targetedTotalPhysician'
              placeholder='Hedeflenen Toplam/Takım'
              value={parseFloat(plan.deduction.targetedTotalPhysician).toFixed(
                2
              )}
            />
            <Form.Input
              label='Hedeflenen Toplam  Ziyaret/Takım'
              fluid
              name='targetedTotalVisit'
              placeholder='Hedeflenen Toplam  Ziyaret/Takım'
              value={parseFloat(plan.deduction.targetedTotalVisit).toFixed(2)}
            />
          </Form.Group>
          <Form.Group>
            <Table striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='8'>
                    <Form.Group widths='five'>
                      <Form.Dropdown
                        fluid
                        clearable
                        name='departmentId'
                        placeholder='Uzmanlık Seçiniz...'
                        search
                        selection
                        options={departmentOptions}
                        value={selectedDepartment}
                        onChange={departmentDropdownChangedHandler}
                      />
                      <Button
                        floated='right'
                        positive
                        disabled={addButtonDisabled}
                        content='Ekle'
                        onClick={addDepartmentToPlanHandler}
                      />
                    </Form.Group>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Uzmanlık</Table.HeaderCell>
                  <Table.HeaderCell>Hekim Evreni</Table.HeaderCell>
                  <Table.HeaderCell>Kapsanan Evren</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Kapsam</Table.HeaderCell>
                  <Table.HeaderCell>Kapsam Adet</Table.HeaderCell>
                  <Table.HeaderCell>
                    Segment Oranı/Hedef Hekim/Hedef Frekans/Ziyaret
                  </Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {plan.deduction.deductionDetails.map((dd, ddIndex) => (
                  <Table.Row key={ddIndex}>
                    <Table.Cell>{dd.department.name}</Table.Cell>
                    <Table.Cell>
                      {parseFloat(dd.physicianUniverse).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      {parseFloat(dd.physicianUniverseCovered).toFixed(2)}
                      <Icon name='percent' size='small' />
                    </Table.Cell>
                    <Table.Cell>
                      {parseFloat(
                        (dd.physicianUniverse * dd.physicianUniverseCovered) /
                          100
                      ).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        error
                        name='scope'
                        value={dd.scope}
                        onChange={(e) =>
                          inputChangedHandler(e, e.target, ddIndex, 0)
                        }
                        icon='percent'
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {parseFloat(
                        (((dd.physicianUniverse * dd.physicianUniverseCovered) /
                          100) *
                          dd.scope) /
                          100
                      ).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Table celled>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Button
                                icon='add'
                                size='mini'
                                onClick={(e) =>
                                  inputActionHandler(e, 'addS', ddIndex, 0)
                                }
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            {dd.segments.map((s, sIndex) => (
                              <Table.Cell key={sIndex}>
                                {' '}
                                <Form.Input
                                  label='Segment Oranı'
                                  size='mini'
                                  error
                                  name='rate'
                                  value={s.rate}
                                  onChange={(e) =>
                                    inputChangedHandler(
                                      e,
                                      e.target,
                                      ddIndex,
                                      sIndex
                                    )
                                  }
                                  action={{
                                    icon: 'remove',
                                    onClick: (e) =>
                                      inputActionHandler(
                                        e,
                                        'removeS',
                                        ddIndex,
                                        sIndex
                                      ),
                                  }}
                                />
                                <Form.Input
                                  label='Hedef Hekim'
                                  size='mini'
                                  fluid
                                  name='targetCount'
                                  value={parseFloat(s.targetCount).toFixed(2)}
                                />
                                <Form.Input
                                  label='Hedef Frekans'
                                  size='mini'
                                  error
                                  name='targetFrequency'
                                  value={s.targetFrequency}
                                  onChange={(e) =>
                                    inputChangedHandler(
                                      e,
                                      e.target,
                                      ddIndex,
                                      sIndex
                                    )
                                  }
                                />
                                <Form.Input
                                  label='Ziyaret'
                                  size='mini'
                                  fluid
                                  name='visit'
                                  value={parseFloat(s.visit).toFixed(2)}
                                />
                              </Table.Cell>
                            ))}
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <Segment basic>
                        <Label as='a' basic size='medium' color='green'>
                          Ziyaret Toplamı:{' '}
                          {parseFloat(calcTotal(dd.segments, 'visit')).toFixed(
                            2
                          )}
                        </Label>

                        <Label as='a' basic size='medium' color='blue'>
                          Kapsam Toplamı:{' '}
                          {parseFloat(
                            calcTotal(dd.segments, 'targetCount')
                          ).toFixed(2)}
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
                    <Table.Cell>
                      <Button
                        color='red'
                        icon='remove'
                        onClick={(e) =>
                          inputActionHandler(e, 'removeDD', ddIndex, 0)
                        }
                      />
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
      render: () => (
        <Tab.Pane>
          <Form.Group widths='five'>
            <Form.Input
              label='TL Coğrafi Pay Ağırlık'
              error
              name='geographicRatio'
              placeholder='TL Coğrafi Pay Ağırlık'
              value={plan.induction.geographicRatio}
              onChange={inputChangedHandler}
              icon='percent'
            />
            <Form.Input
              label='Hekim Ağırlık'
              error
              name='physicianRatio'
              placeholder='Hekim Ağırlık'
              value={plan.induction.physicianRatio}
              onChange={inputChangedHandler}
              icon='percent'
            />
          </Form.Group>
          <Form.Group>
            <Table striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Şehir</Table.HeaderCell>
                  <Table.HeaderCell>TL Pazar</Table.HeaderCell>
                  <Table.HeaderCell>Coğrafi Pay</Table.HeaderCell>
                  <Table.HeaderCell>Toplam Hekim</Table.HeaderCell>
                  <Table.HeaderCell>Hekim Coğrafi Dağılım</Table.HeaderCell>
                  <Table.HeaderCell>
                    Kapsama Oranı İle Hekim Sayısı
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => sortBy(e, 'weightedGeographicRatio')}
                  >
                    Ağırlıklı Coğrafi Pay
                    <Icon color='orange' name='sort amount down' />
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => sortBy(e, 'scopeWeightedGeographicRatio')}
                  >
                    Tüm Uzmanlık Ağırlıklı Coğrafi Pay
                    <Icon color='orange' name='sort amount down' />
                  </Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {plan.induction.inductionDetails.map((id, idIndex) => (
                  <Table.Row key={idIndex}>
                    <Table.Cell>{id.city.name}</Table.Cell>
                    <Table.Cell>{parseFloat(id.market).toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      {parseFloat(id.marketGeographicRatio).toFixed(2)}
                      <Icon name='percent' size='small' />
                    </Table.Cell>
                    <Table.Cell>
                      {parseFloat(id.physicianCount).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      {parseFloat(id.physicianGeographicRatio).toFixed(2)}
                      <Icon name='percent' size='small' />
                    </Table.Cell>
                    <Table.Cell>
                      {parseFloat(id.cityTotalPhysicianScoped).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        background:
                          id.weightedGeographicRatio > plan.minimumScope
                            ? ''
                            : '#dcdff5',
                      }}
                    >
                      {parseFloat(id.weightedGeographicRatio).toFixed(2)}
                      <Icon name='percent' size='small' />
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        background:
                          id.scopeWeightedGeographicRatio > plan.minimumScope
                            ? ''
                            : '#dcdff5',
                      }}
                    >
                      {parseFloat(id.scopeWeightedGeographicRatio).toFixed(2)}
                      <Icon name='percent' size='small' />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        basic
                        size='mini'
                        icon='eye'
                        onClick={(e) => getInductionDetails(e, idIndex)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Form.Group>
        </Tab.Pane>
      ),
    },
  ];
  const updatePlanHandler = (event) => {
    event.preventDefault();
    onUpdatePlan(plan).then((response) => {
      if (response.isSuccess) toast.success('Plan güncellendi.');
      else toast.error('Plan güncellenirken hata oluştu.');
      onGetPlan(plan.id).then((res) => {
        setPlan(res);
      });
    });
  };
  let planUi = props.planLoading ? (
    <Container style={{ width: '90%', margin: '7em auto' }}>
      <PlanListPlaceHolder />
    </Container>
  ) : (
    <Form style={{ width: '90%', margin: '7em auto' }}>
      <Segment color='green'>
        <Form.Group widths='equal'>
          <Form.Input
            label='Plan Periyodu'
            fluid
            name='planPeriod'
            value={plan.planPeriod.name}
          />
          <Form.Input
            label='Veri Periyodu'
            fluid
            name='dataPeriod'
            value={plan.dataPeriod.name}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='Plan Adı'
            fluid
            name='name'
            placeholder='Ad'
            value={plan.name}
            onChange={inputChangedHandler}
          />
          <Form.Input
            label='Fiili TTT'
            fluid
            name='actualMPR'
            placeholder='Fiili TTT'
            value={plan.actualMPR}
            onChange={inputChangedHandler}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='Minimum Kapsam'
            fluid
            name='minimumScope'
            placeholder='Minimum Kapsam'
            value={plan.minimumScope}
            onChange={inputChangedHandler}
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
            onChange={inputChangedHandler}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='TÜMDENGELİM YÖNDETMİ İLE HESAPLANAN TTT SAYISI:'
            name='deductionMPR'
            value={
              plan.deductionMPR ? parseFloat(plan.deductionMPR).toFixed(2) : 0.0
            }
          />
          <Form.Input
            label='TÜMEVARIM YÖNDETMİ İLE HESAPLANAN TTT SAYISI:'
            name='inductionMPR'
            value={
              plan.inductionMPR ? parseFloat(plan.inductionMPR).toFixed(2) : 0.0
            }
          />
        </Form.Group>
      </Segment>
      <Segment color='green'>
        <Tab panes={panes} />
      </Segment>
      <Segment clearing color='green'>
        <Button
          floated='right'
          negative
          name='delete'
          content='Sil'
          onClick={showConfirm}
        />
        <Button
          floated='right'
          positive
          name='save'
          content='Kaydet'
          loading={props.submitting && target === 'save'}
          onClick={(e) => {
            setTarget('save');
            updatePlanHandler(e);
          }}
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
  return (
    <Aux>
      {planUi}
      <Confirm
        open={confirm}
        onConfirm={deletePlanHandler}
        onCancel={closeConfirm}
        content='Onaylıyor musunuz?'
        confirmButton='Evet'
        cancelButton='Vazgeç'
        header='Kayıt Silinecek'
      />
    </Aux>
  );
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
    onGetDepartments: (planId) => dispatch(actions.getDepartments(planId)),
    onGetPlan: (id) => dispatch(actions.getPlan(id)),
    onDeletePlan: (id) => dispatch(actions.deletePlan(id)),
    onOpenModal: (body) => dispatch(actions.openModal(body)),
    onCloseModal: () => dispatch(actions.closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
