import './products.scss';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Products extends Component {

    render () {
        const products = this.props.productslist.map((product) => 
        <div className="item">
            <Link to={"/detail/" + product._id}>
                <div className="item-thumb-container">
                    <img className="item-thumbnail" src={product.img} alt="thumbnail"/>
                </div>
                <div className="item-description">
                    <p className="item-name">{ product.name }</p>
                    <p className="item-description">This is a description of the item. It's price is ${ product.price }. Click on me to edit my name!</p>
                </div>
            </Link>
        </div>);
        return (
            <div>
                {products}
                <Link to={"/create-new/"}>
                    <div className="create">
                        <div className="create-description">
                            <p>Click here to create a new item</p>
                        </div>
                        <div className="create-thumb-container">
                            <img className="item-thumbnail" src="https://www.shareicon.net/data/128x128/2015/08/14/84917_plus_512x512.png" alt="thumbnail"/>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
};