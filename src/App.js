import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Firebase, { Auth, Provider } from './firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import * as setListActions from "./components/allSetLists/actions";
import * as setListFormActions from "./components/newSetListForm/actions";
import * as loginActions from "./components/login/actions";

// Components
import ReqAuth from "./components/common/requireAuth";
import LoginModal from "./components/login/loginModal";
import Header from "./components/common/header";
import NewSetListForm from './components/newSetListForm/newSetListForm';
import AllSetLists from './components/allSetLists/allSetLists';
import GenerateNewList from './components/setListGenerator/generateNewList';
import NotFound from './components/common/notFound';
import Footer from './components/common/footer';

// import 'react-skeleton-css/styles/skeleton.2.0.4.css';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // get LOGIN info from firebase
    this.props.actions.getUser();
    // get the SETLISTS from firebase on componentDidMount
    this.props.actions.fetchSetLists();
    // get the COUNT info from firebase
    this.props.actions.fetchCount();
    // get the newSetList from firebase
    // this.props.actions.fetchNewList();
  }

  render() {
    const isAuthenticated = !!this.props.currentUser;
    return (
      <div className="container">
        <Header currentUser={ this.props.currentUser } count={ this.props.count } login={ this.props.actions.login } logout={ this.props.actions.logout }/>

        <Switch>
          <ReqAuth isAuthenticated={ isAuthenticated } exact path="/" 
            component={NewSetListForm} newSetList={this.props.newSetList} addSetList={this.props.actions.addSetList}
          />

          <ReqAuth path="/setlists" isAuthenticated={ isAuthenticated } 
            component={ AllSetLists } setLists={ this.props.setLists } />

          {/* <ReqAuth path="/generatelist" isAuthenticated={ isAuthenticated }
            component={GenerateNewList} addSetList={ this.props.actions.addSetList } setLists={ this.props.setLists } 
          /> */}
          <Route path="/login"
            render={ (props) => <LoginModal currentUser={ this.props.currentUser } login={ this.props.actions.login } logout={ this.props.actions.logout } /> }
          />
          <Route path="/*" render={ ()=> <NotFound/> }/>
        </Switch>
        
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.currentUser,
    setLists: state.setLists.setLists,
    newListForm: state.newListForm.newSetList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchSetLists: setListActions.fetchSetLists,
      // addSetList: setListFormActions.addSetList,
      deleteSetList: setListFormActions.deleteSetList,
      fetchCount: setListFormActions.getCount,
      getUser: loginActions.getUser,
      fetchNewList: setListFormActions.fetchNewList,
      login: loginActions.loginUser,
      logout: loginActions.logoutUser,
    }, dispatch)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
