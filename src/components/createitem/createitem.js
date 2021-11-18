import React, { Component } from "react";
import '../product/product.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        // e.preventDefault();
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(e);
        }
    }

    render () {
        return (
            <div className="creation">
                <h2>Creating a new item...</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Input name" />
                    <input type="text" placeholder="Input image source" />
                    <input type="submit" value="Submit"/>
                </form>
                <Link to="/products">
                    <button>See all products</button>
                </Link>
            </div>
        );
    }
};