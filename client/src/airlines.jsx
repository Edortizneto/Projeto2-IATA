import React, { Component } from 'react'
import axios from 'axios'

export default class Airlines extends Component {

    constructor(props) {
        super(props)
        
        this.state = {iata: 'AF'}
        
        this.hanldleChange = this.hanldleChange.bind(this);
        this.searchIATA = this.searchIATA.bind(this);
    }

    hanldleChange(event) {
        this.state.iata = event.target.value;
        this.setState(this.state);
    }

    searchIATA() {
        var iata_code = this.state.iata.toUpperCase(); 
        axios.get('http://localhost:9000/search/' + iata_code)
        .then(response => {
            console.log('Search OK');
            window.location = '/review/?airline=' + response.data[0].name;
        })
        .catch(erro => console.log(erro))
    }

    render() {

        return (
            <div>
                <ul>
                    Enter the IATA code from airline (ie: type AF for Air France):
                </ul>
                <ul>
                    <input type='text'
                    value={this.state.iata}
                    onChange={this.hanldleChange}></input>
                </ul>
                <ul>
                    <button type='submit'
                    onClick={this.searchIATA}>Search</button>
                </ul>
            </div>
        );
    }
}