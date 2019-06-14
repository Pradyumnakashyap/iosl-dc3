import React from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import ThemeOptions from '../../components/ThemeOptions';
import MobileMenu from '../../components/MobileMenu';
import addUser from '../Forms/RegularForms/StackedForm'
import registerPackage from '../../components/userSpace/Register'
import Active from '../../components/userSpace/Active';
import UserSpace from '../../components/userSpace/UserSpace'
import Detailed from '../../components/userSpace/Detailed'
/**
 * Pages
 */
import Dashboard from '../Dashboard';
import Components from '../Components';
import UserProfile from '../UserProfile';
import MapsPage from '../MapsPage';
import Forms from '../Forms';
import Charts from '../Charts';
import Calendar from '../Calendar';
import Tables from '../Tables';
import companyindex from '../Dashboard/companyindex'
import Login from '../Login'
import postmanindex from '../Dashboard/postmanIndex'
// import UserSpace from '../Dashboard/UserSpace'


const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  const isUserloggedIn=true;
  return (
       <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>

      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <SideBar />

        <div className="main-panel">
        
          <Header /> 
          <Route exact path="/" component={Login} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/user" component={UserSpace} />
          <Route exact path="/package/:OrderID" component={Detailed} />
          <Route exact path="/packages/active" component={Active} />
          <Route exact path="/company" component={companyindex} />
          <Route exact path="/postman" component={postmanindex} />
          <Route path="/components" component={Components} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/forms" component={Forms} />
          <Route path="/tables" component={Tables} />
          <Route path="/maps" component={MapsPage} />
          <Route path="/registerPackage" component={registerPackage} />
          <Route path="/addUser" component={addUser} />
          
          <Footer />
      </div>
      </div>
     }
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));