import React , {Component , useState, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import ProductHeader from './ProductHeader'
import './App.css';
import item from './item'
const log = console.log

class App extends Component{
  // const [products, setProducts] = useState()
  constructor(){
    super()
    this.state = {
        prods : [],
        isclick: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({
      isclick: true
    })
  }

  componentDidMount(){
        const url = '/product'

        fetch(url)
        .then(
          (response) => {
            this.setState({
          })
            return response.json()
          })
        .then((data)=>{
          this.setState({
            prods: data,
            isclick: false
          })
          console.log(data)
        })
    }

  render(){
    return (
      <Router>
        <Switch>

          <Route path="/home/:topicId" component={item}>
          </Route>
          <Route path="/home" component = {ProductHeader}>
          </Route>


          <Redirect from="/" exact to="/home" />
        </Switch>




      </Router>
    )
}
}

export default App;
