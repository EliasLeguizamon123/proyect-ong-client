import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default function Home() {
    return(
        <div>
            <ul>
                <li>
                    <Link to="/about">about</Link>
                </li>
            </ul>
        </div>        
    );
}