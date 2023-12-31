import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

class UserForm extends Component {

    title;
    id;

    //-- we retrieve id from props.match.params.id --//
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.title = "New User";
        this.state = {
            username: "",
            email: ""
        };

        //-- we check if id is null, which means that we arrive at UserForm without a parameter 
        //   and want to perform adding a new user
        //   In this case, we use the default title of “New User” and do nothing in componentDidMount --//
        if (this.id) {
            this.title = "Edit User";
        }
    }

    //-- If id is valid (not null), it means that we arrive at UserForm 
    //   with a parameter and want to perform editing an existing user
    //   In this case, we set the title to “Edit User” 
    //   We then proceed to retrieve the user object --//

    //-- We need to set enableReinitialize={true} so that the form reinitializes when initialValues prop changes, 
    //   i.e. we get our username and email populated from the firebase callback function --//
    componentDidMount() {
        if (this.id) {
            firebase.database().ref('/' + this.id)
                .on('value', snapshot => {
                    this.setState({
                        username: snapshot.val().username,
                        email: snapshot.val().email
                    });
                });
        }
    }

    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        email: this.state.email,
                        username: this.state.username
                    }}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Email Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        } else if (values.email.length < 10) {
                            errors.email = "Email address too short";
                        }
                        if (!values.username) {
                            errors.username = "Username Required";
                        } else if (values.username.length < 3) {
                            errors.username = "Username too short";
                        }
                        return errors;
                    }}

                    //-- push() generates and writes to a new child location with the value supplied
                    //   It writes to the new child location using a unique key when we stored this key in user.key --//

                    //-- we first check if there is an id
                    //   If so, we call the update method of firebase.database().ref to update
                    //   else, which means the form is in Add New User mode, we use the existing code 
                    //   which calls push() to add the new user object to firebase --//
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            if (this.id) {
                                firebase.database().ref('/' + this.id).update({
                                    username: values.username,
                                    email: values.email
                                }).then(() => this.props.history.push("/"));
                            }
                            else {
                                firebase.database().ref('/').push({
                                    username: values.username,
                                    email: values.email
                                }).then(() => this.props.history.push("/"));
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="email" name="email" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="email" component="div" />
                            </span>
                            <Field type="username" name="username" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="username" component="div" />
                            </span>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div >
        )
    }
}

export default UserForm;