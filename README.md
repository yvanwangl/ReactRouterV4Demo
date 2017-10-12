# ReactRouterV4Demo
react-router v4 demo
### 如何使用

简单两步：<br>
1`.` `npm install`<br>
2`.` `npm run start`<br>

### 故事开始

今天本来是要从0搭建一个React项目的，然后一不小心就装了一个react-router@4.2.0，然后像曾经熟悉的样子引入以下代码：
```
import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Home from './Home';

class App extends Component {
    //Some Code...
    render(){
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Home} />
                //Some Code...
            </Router>
        );
    }
}
```
　　然后我在控制台看到了一个Error: 意思就是说没有找到 `browserHistory` ，这马上让我怀疑人生了。在react-router 的官网我看到了如下的Demo:
```
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
```
　　在react-router 的 github release 历史中发现从v4.2.1开始发布了react-router-dom这个package，从readme中发现packages说明如下：
　　![React-Router Packages](
https://user-gold-cdn.xitu.io/2017/10/12/fc67e2da92c3095f4ad13ebce4913b33))
可以看到已经将DOM绑定相关的剥离到react-router-dom中了。
　　然后在issues中看到有人说升级到v4.2.1之后以前嵌套的路由就失效了，吓得我虎躯一颤，幸亏我没有升级;)。然后就研究了一下到底该如何实现路由嵌套。官方也给出了一些示例，[这个是一级路由的实现](https://reacttraining.com/react-router/web/example/url-params)；[这个是嵌套路由的实现](https://reacttraining.com/react-router/web/example/route-config)。看过代码之后，相信细心的就看出来了，实例中导航部分都放在了路由配置模块中，代码如下：
```
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const ParamsExample = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/netflix">Netflix</Link></li>
        <li><Link to="/zillow-group">Zillow Group</Link></li>
        <li><Link to="/yahoo">Yahoo</Link></li>
        <li><Link to="/modus-create">Modus Create</Link></li>
      </ul>

      <Route path="/:id" component={Child}/>
    </div>
  </Router>
)

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default ParamsExample
```
　　先不说别的，把导航放置在路由配置模块就很别扭啊，导航不应该是一个很纯粹的组件么，为什么会出现在这里。
　　然后又研究了一下嵌套路由的实现，更加别扭了，除了上面的问题不说，嵌套路由还需要以参数的形式传递到父路由对应的组件模块然后在父路由组价中进行渲染。这就更奇怪了，路由配置难道还不能在一个地方完成了么，还能不能愉快的玩耍了！既然是官方给出的示例，一定有他的苦衷，但是抱着一定有别的解决思路的想法还是尝试实验了一下。果然还真给找到了一个比官方完美的多的解决方案，跟官方[嵌套路由](https://reacttraining.com/react-router/web/example/route-config)的效果完全一样，废话不多说，直接上二级嵌套的路由代码：
```
//首页模块Home，一级导航不应该是在这个组件里么
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

//二级路由模块，二级导航在这个组件里
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

//路由配置模块，专注于配置路由，不会把导航写在这里的
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
```
这才是我想要的路由配置方式，组件专注于渲染，路由配置模块专注于路由，其他模块绝不会出现路由渲染的逻辑。要实现上述方案，需要借助一个 `Switch` 组件和一个 `exact` 属性。`Switch` 组件只会渲染匹配到的第一个子组件，`exact` 是严格匹配的意思，一表胜千言：

|    path    | location.pathname | exact | matches? |
| ---------- | ----------------- | ----- | -------- |
|    /tacos  |     /tacos/bus    | true  |   no     |
|    /tacos  |     /tacos/bus    | false |   yes    |

另外需要注意 `Home` 及 `Tacos` 这两个组件，需要传递一个 `children` 属性，如上即可在react-router@4.2.*中完成嵌套路由的配置。 关于为何这么配置会生效，会再写一篇文章具体分析 `Switch` 及 `exact` 的作用。
