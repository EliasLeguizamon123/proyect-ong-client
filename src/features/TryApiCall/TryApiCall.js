import React from 'react';
import './TryApiCall.css';

import { sendRequest } from '../../utils/sendRequest';

const TryApiCall = () => {
  const handleClick = async () => {
    const route = document.querySelector('#inp-route').value;

    const response = await sendRequest('get', route);

    console.log(response);
  };

  return (
    <div className="cont-try-api">
      <div className="cont-input">
        <label htmlFor="inp-route">Route GET</label>
        <input type="text" id="inp-route" />
      </div>

      <button onClick={handleClick}>Try api call</button>
    </div>
  );
};

export default TryApiCall;
