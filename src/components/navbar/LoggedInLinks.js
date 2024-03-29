import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';
import {logoutHandler} from '../../store/database/asynchHandler'

class LoggedInLinks extends React.Component {

    // As in SignIn.jsx we need to use a function that gets as an argument firebase object
    logout = () => {
        console.log(this.props);
        console.log(this)
        const {firebase} = this.props;
        this.props.signOut(firebase);
    }

    render() {
        const {profile, auth} = this.props;
        return (
            <ul className="right">
                <li><NavLink to="/" onClick={this.logout}>Log Out</NavLink></li>
                {/* I left NavLink instead of anchor tag because I'm using airbnb eslint rules */}
                <li><NavLink to={"/" + auth.uid + ""}
                             className="btn btn-floating pink lighten-1">{profile.initials}</NavLink></li>
            </ul>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    signOut: firebase => dispatch(logoutHandler(firebase)),
});

export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps),
)(LoggedInLinks);