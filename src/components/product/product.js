import React, { Component } from "react";
import './product.scss';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSubmit(e) {
        console.log(`submitted`);
        if (typeof this.props.onChangeName === 'function') {
            this.props.onChangeName(e, this.props.match.params.id);
        }
    }

    onDelete(e) {
        e.preventDefault();
        console.log(`deleted`);
        if (typeof this.props.onDelete === 'function') {
            this.props.onDelete(this.props.match.params.id)
        }
    }

    componentDidUpdate(prevProps) {
        const { history } = this.props;
        if (prevProps.deleting !== this.props.deleting) {
            console.log(`${prevProps.deleting} !== ${this.props.deleting}`);
            history.push("/products");
        }
    }

    componentWillUnmount() {
        console.log('unmounting!!!!')
    }

    render () {
        if (this.props.deleting) {
            return (
                <div>
                    &lt;Deleting...&gt;
                </div>
            );
        } else if (this.props.productslist.length <= 0) {
            return (
                <div className="details">
                    <h2>&lt;Loading...&gt;</h2>
                    <div className="item-thumb-container">
                        <img className="item-thumbnail" src="&lt;Loading...&gt;" alt="thumbnail"/>
                    </div>
                    <div>
                        <span>id: </span>{ this.props.match.params.id }
                    </div>
                    <form id="renaming-form" onSubmit={this.onSubmit}>
                        <label for="product-name">Rename Product: </label>
                        <input id="product-name" placeholder="enter product name"/>
                    </form>
                    <Link to="/products">
                        <button>See all products</button>
                    </Link>
                    {/* <Link to="/products"> */}
                    <button form="renaming-form" type="submit">Update Product Name</button>
                    {/* </Link> */}
                    <Link to="/products">
                        <button onClick={this.onDelete}>Delete Product</button>
                    </Link>
                </div>
            );
        } else {
            let id = this.props.match.params.id;
            function checkId(product) {
                return product._id === id;
            }
            let currentProduct = this.props.productslist.find(checkId);
            return (
                <div className="details">
                    <h2>{ currentProduct.name } Details</h2>
                    <div className="item-thumb-container">
                        <img className="item-thumbnail" src={ currentProduct.img } alt="thumbnail"/>
                    </div>
                    <div>
                        <span>id: </span>{ this.props.match.params.id }
                    </div>
                    <form id="renaming-form" onSubmit={this.onSubmit}>
                        <label for="product-name">Rename Product: </label>
                        <input id="product-name" placeholder="enter product name"/>
                    </form>
                    <Link to="/products">
                        <button>See all products</button>
                    </Link>
                    {/* <Link to="/products"> */}
                    <button form="renaming-form" type="submit">Update Product Name</button>
                    {/* </Link> */}
                    <Link to="/products">
                        <button onClick={this.onDelete}>Delete Product</button>
                    </Link>
                </div>
            );
        }
    }
};