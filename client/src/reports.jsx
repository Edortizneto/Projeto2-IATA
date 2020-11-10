import React, { Component } from 'react'
import axios from 'axios'

export default class Reports extends Component {

    constructor(props) {
        super(props)

        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('name');
        const userPwd = urlParams.get('pwd'); 

        this.state = {userdata: {username: userName, password: userPwd, review:[{airline: '', rating: '', obs: ''}] }};    
        this.pressButton = this.pressButton.bind(this);
        this.getUserData = this.getUserData.bind(this);

        this.getUserData();
    }

    pressButton() {
        window.location = '/airlines';
    }

    getUserData() {
        const strData = {
            username: this.state.userdata.username,
            password: this.state.userdata.password
          };

        axios.post('http://localhost:9000/login', strData)
        .then(response => {
            console.log(response.data);
            this.setState({userdata: response.data});
        })
        .catch(erro => console.log(erro))
    }

    render() {

        this.reviews = this.state.userdata.review.map((item) => 
            <li>{item.airline} : {item.rating} : {item.obs}</li>
        );

        return (
            <div>
                <ul>
                    <h2>{this.state.userdata.username}</h2><br/>
                </ul>
                <ul>
                    {this.reviews}
                </ul>
                <ul>
                    <button type='submit'
                    onClick={this.pressButton}>New Airline Review</button>  
                </ul>
            </div>
        );
    }

}