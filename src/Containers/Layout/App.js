import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import NotFound from '../../components/navigation/notFound';
import Dashboard from '../../components/dashboard/dashboard';
import Aux from '../../hoc/auxiliary/auxiliary';
import Navigation from '../../components/navigation/navigation';
import { default as CreatePlanForm } from '../Plan/Create';
import { default as PlanListForm } from '../Plan/List';
import { default as UpdatePlanForm } from '../Plan/Update';
import { default as PlanDetailForm } from '../Plan/Detail';
import Home from '../Home/Home';
import ModalContainer from '../Modal/Container';

const App = (props) => {
  return (
    <Aux>
      <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'} // slashtan sonra ne gelirse gelsin seçilen Route burası. onun dışındakiler (sadece slash) home page.
        //Switch sadece 1 rootun dolmasını sağlar
        render={() => (
          <Aux>
            <ModalContainer />
            <Navigation />
            <Switch>
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/plans' exact component={PlanListForm} />
              <Route path='/update-plan/:id' exact component={UpdatePlanForm} />
              <Route path='/create-plan' exact component={CreatePlanForm} />
              <Route path='/plan-detail/:id' exact component={PlanDetailForm} />
              {/** 
                <Route
                  path='/departments'
                  render={(props) => <DepartmentList {...props} />}
                />
                <Route path='/products/:id' component={ProductForm} />
                <Route path='/create-product' component={ProductForm} />
                <Route
                  path='/products'
                  render={(props) => <ProductList {...props} />}
                />
                */}

              <Route component={NotFound} />
            </Switch>
          </Aux>
        )}
      />
    </Aux>
  );
};

export default withRouter(App);
