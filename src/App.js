import './App.scss';
import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/home/home';
import CreateItem from './components/createitem/createitem.js';
import Products from './components/products/products';
import Product from './components/product/product';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {products: [], deleting: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleSubmit(e) {
    const newItem = {
      id: this.state.products.length+1,
      name: e.target[0].value,
      img: e.target[1].value,
      price: 100
    }
    axios.post("http://localhost:4000/addData", newItem).then(response => {
      // console.log("response is:");
      // console.log(response);
      this.setState(prevState=>({
        products: [...prevState.products, newItem]
      }));
  });
    
    // this.setState(prevState => ({
    //     products: [...prevState.products, {
    //         id: this.state.products.length+1,
    //         name: e.target[0].value,
    //         img: e.target[1].value,
    //         price: 100
    //     }]
    // }))

    // axios.get("http://localhost:4000/getData").then(res => {
    //   this.setState({
    //     products: res.data
    //   });
    // });
  }

  onChangeName(e, id) {
    console.log(`http://localhost:4000/setData/${id}`)
    console.log("RENAMING!!!");
    let prodIndex = this.state.products.findIndex(product => {return product._id === id;});
    axios.put(`http://localhost:4000/setData/${id}`, {newName: e.target[0].value}).then(response => {
      // console.log("response is:");
      // console.log(response);
      this.setState(prevState => ({
        products: {
            ...prevState.products,
            [prevState.products[prodIndex].name]: e.target[0].value,
        },
      }));
      console.log("RE-SET!!!");
      // console.log(this.state.products[id-1]);
    }); 

    // console.log("RENAMING!!!");
    // console.log(this.state.products[0]);
    // await axios.put(`http://localhost:4000/setData/${id}`, {newName: e.target[0].value})
    // console.log("finished waiting, getting state now");
    // axios.get("http://localhost:4000/getData").then(res => {
    //   this.setState({
    //     products: res.data
    //   });
    // });
    // console.log("RE-SET!!!");
    // console.log(this.state.products[0]);

    // var productsCopy = [...this.state.products];
    // productsCopy[id-1].name = e.target.value;
    // this.setState({ products: productsCopy });
  }

  onDelete(id) {
    this.setState({ deleting: true });
    console.log("DELETING product with id " + id);
    console.log(this.state.deleting);
    axios.delete(`http://localhost:4000/delData/${id}`, {id: id}).then(response => {
      console.log("response is:");
      console.log(response);
      this.setState({ products: this.state.products.filter(function(item) { 
        return item._id !== id
      }), deleting: false});
      console.log(this.state.deleting);
      console.log("FULLY DELETED!!!");
    });
  }

  componentDidMount() {
    axios.get("http://localhost:4000/getData").then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  render () {
    return (
      <div className="App">
        <div className="title">TheShop&trade;</div>
          <Router>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/products">Products</Link>
            </div>

            <hr/>

            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} productslist={this.state.products}/>} >
              </Route>
              <Route path="/products" render={(props) => <Products {...props} productslist={this.state.products}/>} >
              </Route>
              <Route path="/detail/:id" render={(props) => <Product {...props} productslist={this.state.products} deleting={this.state.deleting} onDelete={this.onDelete} onChangeName={this.onChangeName}/>} >
              </Route>
              <Route path="/create-new/" render={(props) => <CreateItem {...props} onSubmit={this.handleSubmit}/>} />
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
