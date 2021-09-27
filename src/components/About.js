import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Home() {
    return(
        <ul>
            <li>
                <Link to="/">home</Link>
            </li>
        </ul>       
    );
}