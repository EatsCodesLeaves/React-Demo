import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";

function NoMatch(props) {
    return (
        <div>
            No page found. Please enter a valid URL.
        </div>
    );
};

export default NoMatch;