import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Media, Form, FormGroup, FormControl, Button } from 'reactbootstrap';

class GitHub extends Component {

    constructor() {
        super();
        this.state = { 
            data: [],
            isLoading: true 
        };
    }

    //-- when we need to call the server --//
    componentDidMount() {
        this.getGitHubData("greg");
    }

    //-- method that will return GitHub data from our API endpoint --//
    //-- return type of get() is a promise --//
    //-- we have to access data.items property to get the items array
    //   direct as that is in the json structure of the GitHub response --//
    getGitHubData(_searchTerm) {
        axios.get("https://api.github.com/search/users?q=" + _searchTerm)
        .then(res => {
            this.setState({ 
                isLoading: false,
                data: res.data.items
            })
        });
    }

    render() {

        const listUsers = this.state.data.map((user) => 
            <Media key={user.id}>
                <a href={user.html_url}>
                    <img 
                        width={64}
                        height={64}
                        className="mr-3"
                        src={user.avatar_url}
                        alt="Generic Placeholder"
                    />
                </a>
                <Media.Body>
                    <h5>Login: {user.login}</h5>
                    <p>Id: {user.id}</p>
                </Media.Body>
            </Media>
        );

        return (
            <div>
                <h3>GitHub Users Results</h3>
                { this.state.isLoading && 
                    <ReactLoading type="spinningBubbles" color="#444" />
                }
                {listUsers}
            </div>
        )
    }
}

export default GitHub;