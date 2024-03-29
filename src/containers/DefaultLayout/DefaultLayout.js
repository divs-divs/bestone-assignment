import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import auth from '../../utils/authentication'
import constant from '../../constants/constant';
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import HttpTransferService from '../../utils/httptransfer'

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';

// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const httptransfer = new HttpTransferService();

var navItems = { items: [] };


class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change_password:false
     };
    if (navigation) {
      navigation.items.map((element, i) => {
        if ((element.name === "Check Languages")) {
          element.name = "Check Languages"
          navItems.items.push(element);
        }
      })
    }
  }
  componentWillMount(prevState){

  }

loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

render() {
  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={this.loading()}>
          <DefaultHeader />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navItems} {...this.props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container fluid>
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={this.loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={this.loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}
}

DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (DefaultLayout);
