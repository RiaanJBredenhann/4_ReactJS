import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    //-- This is where server requests and state updates should occur --//

    //-- we specify the location of a node in firebase as an argument to the
    //   firebase.database().ref method to retrieve our list of users --//
    //-- firebase.database() provides us with a Firebase Database service interface and its
    //   ref method returns the location in the Database corresponding to the provided path --//

    //-- We then listen for data changes at our specified location 
    //   by providing a callback function to the on method --//

    //-- Any time you read data from a firebase Database, you receive the data as a DataSnapshot
    //   A DataSnapshot is passed to the event callback you attach with on()
    //   You can extract the contents of the snapshot as a JavaScript object by calling the val() method --//
    componentDidMount() {
        firebase.database().ref('/').on('value', snapshot => {
            let returnArr = [];
            snapshot.forEach(data => {
                var user = data.val();
                user['key'] = data.key;
                returnArr.push(user);
            });
            this.setState({
                users: returnArr
            });
            console.log(snapshot.val());
        })
    }

    render() {

        const listUsers = this.state.users.map((user) =>
            <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>Edit</td>
                <td>Remove</td>
            </tr>
        );

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default User;