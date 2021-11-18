import './home.scss';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Home extends Component {
    
    render () {
        const products = this.props.productslist.slice(0, 3).map((product) =>
            <Link className="toplink" to={"/detail/" + product._id}>
                {product.name}
            </Link>
        );
        return (
            <>
                <h2>Top Products</h2>
                <div className="product">
                    {products}            
                </div>
            </>
        );
    }
};