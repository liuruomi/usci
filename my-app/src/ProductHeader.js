import React , {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useRouteMatch as match, useParams} from 'react-router-dom';
import logo from './white.jpeg'
class ProductHeader extends Component{

  constructor(){
    super()
    this.state = {
        "name":"",
        "price":"",
        "stock":"",
        prods : [],
        "error":""
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
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
            prods: data
          })
          console.log(data)
        })
    }


  handleChange(event){
    const{name, value} = event.target
    this.setState({
        [name]: value
    })
  }

  handleValidation(){
    let name = this.state.name;
    let price = this.state.price;
    let stock  = this.state.stock;
    let formIsValid = true;
    if(!name || !price ||!stock){
           formIsValid = false;
        }
    return formIsValid
  }

  handleClick(){
    if(!this.handleValidation()){
        alert("Completely filled the form!");
    } else{
    const url = '/product'
    const prod = this.state
    console.log(prod)
    const request = new Request(url, {
    method: 'post',
    body: JSON.stringify({prod}),
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    })

    fetch(request)
    .then(
      (response) => {
        return response.json()
      })
    .then((data)=>console.log(data))
}

  }

  render(){
    return(
        <div className="App">
            <p className="App-header" style={{backgroundImage:`url(${logo})`, backgroundPosition: 'center', height: '100%'}}>
                <h1 style={{ color: 'blue' }}>
                Shopping Tracker App
                </h1>
                <form style={{ color: 'blue' }}>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Apple"
                        value = {this.state.name}
                        onChange = {this.handleChange}
                    />
                    <label> Price: </label>
                    <input
                        type="text"
                        name="price"
                        placeholder="$$$"
                        value = {this.state.price}
                        onChange = {this.handleChange}
                    />
                    <label> Stock: </label>
                    <input
                        type="text"
                        name="stock"
                        placeholder="###"
                        value = {this.state.stock}
                        onChange = {this.handleChange}
                    />

                    <input type = "submit" value = "Put Item" onClick = {this.handleClick} />
                </form>

                <div style = {{'textAlign':'left'}}>
                <h2 className="stock">
                Current Stock:
                </h2>
                <div >
                {
                    this.state.prods.map((prod, i)=>{

                        return(
                            <div key={i} className="item">

                            <Link to={`/home/${prod.product_id.product_name}`}> {prod.product_id.product_name} - {prod.product_id.current_price} </Link>

                            </div>
                            )
                        console.log(prod.product_id)
                    })
                }
                </div>
                </div>
                </p>
        </div>
        )
  }
  }

  export default ProductHeader;
