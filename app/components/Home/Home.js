import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {children} = this.props;
        return (
            <div>
                <ul>
                    <li><Link to='/tacos'>Tacos</Link></li>
                    <li><Link to='/sandwiches'>Sandwiches</Link></li>
                </ul>
                {children}
            </div>
        );
    }
}