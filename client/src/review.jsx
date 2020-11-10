import React, { Component } from 'react'
import axios from 'axios'

export default class Review extends Component {

    constructor(props) {
        super(props)

        const urlParams = new URLSearchParams(window.location.search);
        const airLine = urlParams.get('airline');

        this.state = { airline: airLine , username: '', password: '', rating: '0', obs: '' };    

        this.hanldleChangeName = this.hanldleChangeName.bind(this);
        this.hanldleChangePwd = this.hanldleChangePwd.bind(this);
        this.hanldleChangeRating = this.hanldleChangeRating.bind(this);
        this.hanldleChangeObs = this.hanldleChangeObs.bind(this);
        
        this.reviewData = this.reviewData.bind(this);
    }

    hanldleChangeName(event) {
        this.state.username = event.target.value;
        this.setState(this.state);
    }

    hanldleChangePwd(event) {
        this.state.password = event.target.value;
        this.setState(this.state);
    }

    hanldleChangeRating(event) {
        this.state.rating = event.target.value;
        this.setState(this.state);
    }

    hanldleChangeObs(event) {
        this.state.obs = event.target.value;
        this.setState(this.state);
    }

    reviewData() {
        const strData = {
            username: this.state.username,
            password: this.state.password,
            airline: this.state.airline,
            rating: this.state.rating,
            obs: this.state.obs
          };

        axios.post('http://localhost:9000/review', strData)
        .then(response => {
            console.log(response);
            window.location = '/reports?name=' + this.state.username + '&pwd=' + this.state.password;
        })
    }

    render() {

        return (
            <div>
                <ul>
                    <h2>{this.state.airline}</h2><br/>
                </ul>
                <ul>
                    Enter your username and password to make your review:
                </ul>
                <ul>
                    Enter your <b>username</b>:<br/>
                    <input type='text'
                    value={this.state.username}
                    onChange={this.hanldleChangeName}></input>
                </ul>
                <ul>
                    Enter your <b>password</b>:<br/>
                    <input type='text'
                    value={this.state.password}
                    onChange={this.hanldleChangePwd}></input>
                </ul>
                <ul>
                    Enter your <b>rating (0 to 10)</b>:<br/>
                    <input type='text'
                    value={this.state.rating}
                    onChange={this.hanldleChangeRating}></input>
                </ul>
                <ul>
                    Enter your <b>comments</b>:<br/>
                    <input type='text'
                    value={this.state.obs}
                    onChange={this.hanldleChangeObs}></input>
                </ul>
                <ul>
                    <button type='submit'
                    onClick={this.reviewData}>Review</button>  
                </ul>
            </div>
        );
    }

}