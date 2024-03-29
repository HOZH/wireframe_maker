import React, {Component} from 'react';
import {firebaseConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import DatabaseTester from './test/DatabaseTester.js';
import WorkScreen from './components/work_screen/WorkScreen.js';


class App extends Component {
    render() {
        const {auth} = this.props;

        if (auth.isLoaded) {
            return (
                <BrowserRouter>
                    <div className="App">
                        <Navbar/>
                        <Switch>
                            <Route exact path="/" component={HomeScreen}/>
                            <Route path="/admin" component={DatabaseTester}/>
                            <Route path="/register" component={RegisterScreen}/>
                            <Route path="/login" component={LoginScreen}/>
                            <Route path="/:any/work/:id" component={WorkScreen}/>
                            <Route path="/:any" component={HomeScreen}/>
                        </Switch>

                    </div>
                </BrowserRouter>
            );
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
};

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
)(App);
