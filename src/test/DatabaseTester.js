import React from 'react'
import {connect} from 'react-redux';
import todoJson from './TestTodoListData.json'
import {getFirestore} from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('workLists').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                fireStore.collection('workLists').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        todoJson.workLists.forEach(dataJson => {
            fireStore.collection('workLists').add({
                name: dataJson.name,
                owner: dataJson.owner,
                items: dataJson.items,
                screenWidth: dataJson.screenWidth,
                screenHeight: dataJson.screenHeight,
                timestamp: fireStore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("reset database");
            }).catch((err) => {
                // console.log(err);
                console.err(err)
            });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Load Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);