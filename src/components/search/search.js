import './search.scss';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";

function Search({productslist}) {
    const { search } = useLocation();
    let query = React.useMemo(() => new URLSearchParams(search), [search]);

    // console.log("PRODUCT LIST:");
    // console.log(productslist);
    // console.log("FILTER:");
    // console.log(query.get("search"));
    let searchfilter = query.get("search")
    // console.log(productslist.filter((prod) => { return prod.name.substring(0, searchfilter.length).localeCompare(searchfilter, 'en', {sensitivity: 'accent'}) === 0}));
    const products = productslist.filter((prod) => { return prod.name.substring(0, searchfilter.length).localeCompare(searchfilter, 'en', {sensitivity: 'accent'}) === 0}).map((product) => 
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
};

export default Search;