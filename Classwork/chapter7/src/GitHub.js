import React, { Component } from 'react';
import axios from 'axios';

class GitHub extends Component {

    constructor() {
        super();
        this.getGitHubData("greg");
    }

    //-- method that will return GitHub data from our API endpoint --//
    //-- return type of get() is a promise --//
    //-- we have to access data.items property to get the items array
    //   direct as that is in the json structure of the GitHub response --//
    getGitHubData(_searchTerm) {
        axios.get("https://api.github.com/search/users?q=" + _searchTerm)
        .then(res => console.log(res.data.items));
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default GitHub;