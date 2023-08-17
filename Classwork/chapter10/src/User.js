import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showDeleteDialog: false,
            selectedUser: {}
        };

        this.add = this.add.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.delete = this.delete.bind(this);
    }

    //-- method that adds a new user --//
    //-- this.props.history.push navigates the user to the specified target route --//
    add(e) {
        this.props.history.push("/add");
    }

    //-- this method simply sets showDeleteDialog to true to show the delete dialog
    //   It also sets selectedUser to the user which is clicked --//
    openDeleteDialog(user) {
        this.setState({
            showDeleteDialog: true,
            selectedUser: user
        });
    }

    //-- closeDeleteDialog sets the state’s showDeleteDialog to false 
    //   to hide the delete Modal and also sets selectedUser to null --//
    closeDeleteDialog() {
        this.setState({
            showDeleteDialog: false,
            selectedUser: {}
        });
    }

    //-- In the delete() method, we reference the specific user node location to delete in firebase database with 
    //   firebase.database().ref('/'+this.state.selectedUser.key)
    //   The location of the user node is contained in the key property of the user we have clicked to delete --//
    delete(e) {
        firebase.database().ref('/' + this.state.selectedUser.key).remove()
            .then(x => {
                console.log("SUCCESS");
                this.closeDeleteDialog();
            })
            .catch(error => {
                alert("Could not delete the user.");
                console.log("ERROR", error)
            });
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
                <td>
                    <Link to={`/edit/${user.key}`}>
                        Edit
                    </Link>
                </td>
                <td>
                    <Button onClick={this.openDeleteDialog.bind(this, user)}>Remove</Button>
                </td>
            </tr>
        );

        return (
            <div>
                <Button variant="primary" onClick={this.add}>Add</Button>
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
                <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete
                            {this.state.selectedUser.username}?</p>
                        <hr />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.delete}>Delete</Button>
                        <Button onClick={this.closeDeleteDialog}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default User;