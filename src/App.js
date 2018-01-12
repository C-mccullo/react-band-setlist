import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Firebase, { Auth, Provider } from './firebase';

import ReqAuth from "./components/common/requireAuth";
import LoginModal from "./components/login/loginModal";
import Header from "./components/common/header";
import NewSetListForm from './components/setListForm/newSetListForm';
import AllSetLists from './components/allSetLists/allSetLists';
import GenerateNewList from './components/setListGenerator/generateNewList';
import NotFound from './components/common/notFound';
import Footer from './components/common/footer';

// import 'react-skeleton-css/styles/skeleton.2.0.4.css';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.addSetList = this.addSetList.bind(this);
    this.useSetList = this.useSetList.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.resetCount = this.resetCount.bind(this);
    this.deleteSetList = this.deleteSetList.bind(this);

    this.state = {
      setLists: [
        /* {
          newSong: "",
          songList: [],
          used: false,
          timeStamp: ""
        } */
      ],
      count: 0,
      login: false,
      currentUser: null
    };
  }

  componentDidMount() {
    const setListsRef = Firebase.database().ref("setLists");

    setListsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newSetLists = [];

      for (let item in items) {
        const value = items[item]
        newSetLists.push({ 
          id: item, 
          songList: value.songList,
          used: value.used,
          timeStamp: value.timeStamp
        });
      }
      this.setState({ setLists: newSetLists });
    });

    const countRef = Firebase.database().ref("count");
    countRef.on("value", (snapshot) => {
      this.setState({ count: snapshot.val() });
    });

    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUser: user, login: true });
      }
    });
  }

  logout() {
    Auth.signOut()
    .then(() => {
      this.setState({
        currentUser: null,
        login: false
      });
    });
  }

  login() {
    Auth.signInWithPopup(Provider) 
    .then((result) => {
      const currentUser = result.user;
      this.setState({
        currentUser,
        login: true
      });
    });
  }

  addSetList(list) {
    const setListsRef = Firebase.database().ref("setLists");
    const countRef = Firebase.database().ref("count");
    const updateSetLists = this.state.setLists.concat(list);
    const updateLength = updateSetLists.length;
    const currentLength = this.state.setLists.length;

    let newCount = this.state.count;
    if (updateLength > currentLength) {
      newCount = newCount + (updateLength - currentLength);
    }
    setListsRef.push(list);
    countRef.set(newCount);
  }

  deleteSetList(list) {
    const setListsRef = Firebase.database().ref("setLists");
    const newSetLists = this.state.setLists.filter((setList) => {
      return setList.id !== list
    })
    setListsRef.child(list).remove();
    this.setState({ setLists: newSetLists });
  }

  resetCount() {
    const countRef = Firebase.database().ref("count");
    const newCount = 0;
    countRef.set(newCount);
    this.setState({ count: newCount });
  }

  useSetList(id) {
    let setLists = this.state.setLists;
    const timeStamp = (new Date()).getTime().toString();
    setLists[id].timeStamp = timeStamp;
    setLists[id].used = true;
    this.setState({ setLists: setLists });
    console.log(setLists[id]);
  }

  render() {
    const isAuthenticated = !!this.state.currentUser;
    return (
      <div className="container">
        <Header currentUser={ this.state.currentUser } count={ this.state.count } login={ this.login } logout={ this.logout }/>

        <Switch>
          <ReqAuth isAuthenticated={ isAuthenticated } exact path="/" 
            component={ NewSetListForm } onAddSetList={ this.addSetList }
          />

          <ReqAuth path="/setlists" isAuthenticated={ isAuthenticated } 
            component={ AllSetLists } onUseSetList={ this.useSetList } 
            onReset={ this.resetCount } count={ this.state.count } 
            setLists={ this.state.setLists } onDeleteList={this.deleteSetList}
          />

          <ReqAuth path="/generatelist" isAuthenticated={ isAuthenticated }
            component={GenerateNewList} onAddSetList={ this.addSetList } setLists={ this.state.setLists } 
          />
          <Route path="/login"
            render={ (props) => <LoginModal currentUser={ this.state.currentUser } login={ this.login } logout={ this.logout } /> }
          />
          <Route path="/*" render={ ()=> <NotFound/> }/>
        </Switch>
        
        <Footer/>
      </div>
    );
  }
}

export default App;
