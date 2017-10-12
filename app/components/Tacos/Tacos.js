import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Tacos extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {children} = this.props;
        return (
            <div>
                <div>Tacos</div>
                <ul>
                    <li><Link to='/tacos/bus'>Bus</Link></li>
                    <li><Link to='/tacos/cart'>Cart</Link></li>
                </ul>            
                {children}
            </div>
        );
    }
}