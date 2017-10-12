import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {children} = this.props;
        return (
            <div style={{margin: '0 auto', width: '40%'}}>
                <ul>
                    <li><Link to='/tacos'>Tacos</Link></li>
                    <li><Link to='/sandwiches'>Sandwiches</Link></li>
                </ul>
                {children}
                <div style={{marginTop: 100}}>
                    <a href='https://reacttraining.com/react-router/web/example/route-config' target='_blank'>官方的嵌套路由实现</a>    
                </div>
            </div>
        );
    }
}