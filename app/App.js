import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Sandwiches from './components/Sandwiches/Sandwiches';
import Tacos from './components/Tacos/Tacos';
import Bus from './components/Bus/Bus';
import Cart from './components/Cart/Cart';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Home>
                        <Switch>
                            <Route path='/sandwiches' component={Sandwiches}/>
                            <Route exact path='/tacos' component={Tacos}/>
                            <Tacos>
                                <Route path='/tacos/bus' component={Bus}/>
                                <Route path='/tacos/cart' component={Cart}/>
                            </Tacos>
                        </Switch>
                    </Home>
                </Switch>
            </Router>
        );
    }
}