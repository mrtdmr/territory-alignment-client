import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import {
  Segment,
  Button,
  Dropdown,
  Grid,
  List,
  Container,
} from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import { updateObject } from '../../shared/utility';
import Market from '../../components/market/market';
import City from '../../components/city/city';
import Department from '../../components/department/department';
import { default as Loading } from '../../components/loading/loading';

const Create = (props) => {
  const [plan, setPlan] = useState({
    name: '',
    active: true,
    actualMPR: 0.0,
    minimumScope: 0.0,
    teamId: 0,
    markets: [],
    cities: [],
    departments: [],
  });

  const {
    onGetTeams,
    onCreatePlan,
    onGetMarkets,
    onGetCities,
    onGetDepartments,
  } = props;
  const [marketsNotSelected, setMarketsNotSelected] = useState([]);
  const [marketsSelected, setMarketsSelected] = useState([]);

  const [citiesSelected, setCitiesSelected] = useState([]);
  const [citiesNotSelected, setCitiesNotSelected] = useState([]);

  const [departmentsSelected, setDepartmentsSelected] = useState([]);
  const [departmentsNotSelected, setDepartmentsNotSelected] = useState([]);

  useEffect(() => {
    onGetTeams();
    onGetMarkets().then((res) => {
      setMarketsNotSelected(res);
    });
    onGetCities().then((res) => {
      setCitiesNotSelected(res);
    });
    onGetDepartments().then((res) => {
      setDepartmentsNotSelected(res);
    });
  }, [onGetTeams, onGetMarkets, onGetCities, onGetDepartments]);

  const teamOptions = props.teams
    ? props.teams.map((t) => ({
        key: t.id,
        text: t.name,
        value: t.id,
      }))
    : null;

  const inputChangedHandler = (event, input) => {
    const updatedPlan = updateObject(plan, {
      [input.name]: input.value,
    });
    setPlan(updatedPlan);
  };
  const addMarketToPlan = (event, market) => {
    event.preventDefault();
    setMarketsNotSelected(marketsNotSelected.filter((m) => m.id !== market.id));
    setMarketsSelected(marketsSelected.concat(market));
  };
  const removeMarketFromPlan = (event, market) => {
    event.preventDefault();
    setMarketsSelected(marketsSelected.filter((m) => m.id !== market.id));
    setMarketsNotSelected(marketsNotSelected.concat(market));
  };
  const addAllMarketsToPlan = (event) => {
    event.preventDefault();
    if (!props.markets) return;
    const markets = [];
    setMarketsSelected([]);
    props.markets.forEach((m) => {
      markets.push(m);
    });
    setMarketsSelected(markets);
    setMarketsNotSelected([]);
  };
  const removeAllMarketsFromPlan = (event) => {
    event.preventDefault();
    const markets = [];
    setMarketsNotSelected([]);
    props.markets.forEach((c) => {
      markets.push(c);
    });
    setMarketsSelected([]);
    setMarketsNotSelected(markets);
  };

  const addDepartmentToPlan = (event, department) => {
    event.preventDefault();
    setDepartmentsNotSelected(
      departmentsNotSelected.filter((d) => d.id !== department.id)
    );
    setDepartmentsSelected(departmentsSelected.concat(department));
  };
  const removeDepartmentFromPlan = (event, department) => {
    event.preventDefault();
    setDepartmentsSelected(
      departmentsSelected.filter((d) => d.id !== department.id)
    );
    setDepartmentsNotSelected(departmentsNotSelected.concat(department));
  };
  const addAllDepartmentsToPlan = (event) => {
    event.preventDefault();
    if (!props.departments) return;
    const departments = [];
    setDepartmentsSelected([]);
    props.departments.forEach((d) => {
      departments.push(d);
    });
    setDepartmentsSelected(departments);
    setDepartmentsNotSelected([]);
  };
  const removeAllDepartmentsFromPlan = (event) => {
    event.preventDefault();
    const departments = [];
    setDepartmentsNotSelected([]);
    props.departments.forEach((d) => {
      departments.push(d);
    });
    setDepartmentsSelected([]);
    setDepartmentsNotSelected(departments);
  };

  const addCityToPlan = (event, city) => {
    event.preventDefault();
    setCitiesNotSelected(citiesNotSelected.filter((c) => c.id !== city.id));
    setCitiesSelected(citiesSelected.concat(city));
  };
  const removeCityFromPlan = (event, city) => {
    event.preventDefault();
    setCitiesSelected(citiesSelected.filter((c) => c.id !== city.id));
    setCitiesNotSelected(citiesNotSelected.concat(city));
  };
  const addAllCitiesToPlan = (event) => {
    event.preventDefault();
    if (!props.cities) return;
    const cities = [];
    setCitiesSelected([]);
    props.cities.forEach((c) => {
      cities.push(c);
    });
    setCitiesSelected(cities);
    setCitiesNotSelected([]);
  };
  const removeAllCitiesFromPlan = (event) => {
    event.preventDefault();
    const cities = [];
    setCitiesNotSelected([]);
    props.cities.forEach((c) => {
      cities.push(c);
    });
    setCitiesSelected([]);
    setCitiesNotSelected(cities);
  };

  const createPlanHandler = () => {
    plan.markets = marketsSelected;
    plan.cities = citiesSelected;
    plan.departments = departmentsSelected;
    onCreatePlan(plan);
  };

  let marketsLoading = props.marketsLoading ? (
    <Loading content='Pazarlar yükleniyor...' />
  ) : null;
  let departmentsLoading = props.departmentsLoading ? (
    <Loading content='Uzmanlıklar yükleniyor...' />
  ) : null;
  let citiesLoading = props.citiesLoading ? (
    <Loading content='Şehirler yükleniyor...' />
  ) : null;
  return (
    <Container style={{ marginTop: '7em' }}>
      <Form onSubmit={createPlanHandler}>
        <Segment clearing>
          <Form.Field>
            <label>Plan Adı</label>
            <Form.Input
              name='name'
              placeholder='Ad'
              onChange={inputChangedHandler}
            />
          </Form.Field>
          <Form.Field>
            <label>Fiili TTT</label>
            <Form.Input
              name='actualMPR'
              placeholder='Fiili TTT'
              onChange={inputChangedHandler}
            />
          </Form.Field>
          <Form.Field>
            <label>Minimum Kapsam</label>
            <Form.Input
              name='minimumScope'
              onChange={inputChangedHandler}
              placeholder='Minimum Kapsam'
            />
          </Form.Field>

          <Form.Field>
            <label>Takım</label>
            <Dropdown
              name='teamId'
              placeholder='Takım Seçiniz...'
              search
              selection
              options={teamOptions}
              onChange={inputChangedHandler}
            />
          </Form.Field>
        </Segment>

        <Segment clearing>
          <Grid>
            <Grid.Column width={8}>
              <Segment clearing>
                <label>Plana eklemek istediğiniz pazarı seçiniz</label>
                <Button
                  floated='right'
                  color='green'
                  onClick={(event) => addAllMarketsToPlan(event)}
                >
                  Tümünü Ekle
                </Button>
              </Segment>
              <Segment clearing>
                {marketsLoading}
                <List
                  style={{ height: '250px', overflowY: 'scroll' }}
                  animated
                  divided
                  relaxed
                >
                  {marketsNotSelected
                    ? marketsNotSelected.map((mns) => (
                        <List.Item key={mns.id}>
                          <List.Content floated='right'>
                            <Button
                              onClick={(event) => addMarketToPlan(event, mns)}
                            >
                              Ekle
                            </Button>
                          </List.Content>
                          <List.Content>
                            <Market name={mns.name}></Market>
                          </List.Content>
                        </List.Item>
                      ))
                    : null}
                </List>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment clearing>
                <label>Plandan çıkarmak istediğiniz pazarı seçiniz</label>
                <Button
                  floated='right'
                  color='red'
                  onClick={(event) => removeAllMarketsFromPlan(event)}
                >
                  Tümünü Çıkar
                </Button>
              </Segment>
              <Segment clearing>
                <List
                  style={{ height: '250px', overflowY: 'scroll' }}
                  animated
                  divided
                  relaxed
                >
                  {marketsSelected
                    ? marketsSelected.map((ms) => (
                        <List.Item key={ms.id}>
                          <List.Content floated='right'>
                            <Button
                              color='red'
                              onClick={(event) =>
                                removeMarketFromPlan(event, ms)
                              }
                            >
                              Çıkar
                            </Button>
                          </List.Content>
                          <List.Content>
                            <Market name={ms.name}></Market>
                          </List.Content>
                        </List.Item>
                      ))
                    : null}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment clearing>
          <Grid>
            <Grid.Column width={8}>
              <Segment clearing>
                <label>Plana eklemek istediğiniz uzmanlığı seçiniz</label>
                <Button
                  floated='right'
                  color='green'
                  onClick={(event) => addAllDepartmentsToPlan(event)}
                >
                  Tümünü Ekle
                </Button>
              </Segment>
              <Segment clearing>
                {departmentsLoading}
                <List
                  style={{ height: '250px', overflowY: 'scroll' }}
                  animated
                  divided
                  relaxed
                >
                  {departmentsNotSelected
                    ? departmentsNotSelected.map((dns) => (
                        <List.Item key={dns.id}>
                          <List.Content floated='right'>
                            <Button
                              onClick={(event) =>
                                addDepartmentToPlan(event, dns)
                              }
                            >
                              Ekle
                            </Button>
                          </List.Content>
                          <List.Content>
                            <Department name={dns.name}></Department>
                          </List.Content>
                        </List.Item>
                      ))
                    : null}
                </List>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment clearing>
                <label>Plandan çıkarmak istediğiniz uzmanlığı seçiniz</label>
                <Button
                  floated='right'
                  color='red'
                  onClick={(event) => removeAllDepartmentsFromPlan(event)}
                >
                  Tümünü Çıkar
                </Button>
              </Segment>
              <Segment clearing>
                <List
                  style={{ height: '250px', overflowY: 'scroll' }}
                  animated
                  divided
                  relaxed
                >
                  {departmentsSelected
                    ? departmentsSelected.map((ds) => (
                        <List.Item key={ds.id}>
                          <List.Content floated='right'>
                            <Button
                              color='red'
                              onClick={(event) =>
                                removeDepartmentFromPlan(event, ds)
                              }
                            >
                              Çıkar
                            </Button>
                          </List.Content>
                          <List.Content>
                            <Department name={ds.name}></Department>
                          </List.Content>
                        </List.Item>
                      ))
                    : null}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment clearing>
          <Grid>
            <Grid.Column width={8}>
              <Segment clearing>
                <label>Plana eklemek istediğiniz şehri seçiniz</label>
                <Button
                  floated='right'
                  color='green'
                  onClick={(event) => addAllCitiesToPlan(event)}
                >
                  Tümünü Ekle
                </Button>
              </Segment>
              <Segment clearing>
                {citiesLoading}
                <List
                  style={{ height: '250px', overflowY: 'scroll' }}
                  animated
                  divided
                  relaxed
                >
                  {citiesNotSelected
                    ? citiesNotSelected.map((cns) => (
                        <List.Item key={cns.id}>
                          <List.Content floated='right'>
                            <Button
                              onClick={(event) => addCityToPlan(event, cns)}
                            >
                              Ekle
                            </Button>
                          </List.Content>
                          <List.Content>
                            <City name={cns.name}></City>
                          </List.Content>
                        </List.Item>
                      ))
                    : null}
                </List>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment clearing>
                <label>Plandan çıkarmak istediğiniz şehri seçiniz</label>
                <Button
                  floated='right'
                  color='red'
                  onClick={(event) => removeAllCitiesFromPlan(event)}
                >
                  Tümünü Çıkar
                </Button>
              </Segment>
              <Segment clearing>
                <List
                  style={{ height: '250px', overflowY: 'scroll' }}
                  divided
                  relaxed
                  animated
                >
                  {citiesSelected
                    ? citiesSelected.map((cs) => (
                        <List.Item key={cs.id}>
                          <List.Content floated='right'>
                            <Button
                              color='red'
                              onClick={(event) => removeCityFromPlan(event, cs)}
                            >
                              Çıkar
                            </Button>
                          </List.Content>
                          <List.Content>
                            <City name={cs.name}></City>
                          </List.Content>
                        </List.Item>
                      ))
                    : null}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
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
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    teams: state.team.teams,
    teamsLoading: state.team.loading,
    marketsLoading: state.market.loading,
    citiesLoading: state.city.loading,
    departmentsLoading: state.department.loading,
    submitting: state.plan.submitting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTeams: () => dispatch(actions.getTeams()),
    onCreatePlan: (plan) => dispatch(actions.createPlan(plan)),
    onGetMarkets: () => dispatch(actions.getMarkets()),
    onGetCities: () => dispatch(actions.getCities()),
    onGetDepartments: () => dispatch(actions.getDepartments()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
