import React from 'react';
import { Button } from '@chakra-ui/react';
import './TryApiCall.css';

import { sendRequest } from '../../utils/sendRequest';

const TryApiCall = () => {
  const handleClick = async () => {
    const route = document.querySelector('#inp-route').value;

    const response = await sendRequest('get', route);

    alert(response);
  };

  return (
    <div className="cont-try-api">
      <div className="cont-input">
        <label htmlFor="inp-route">
          Route GET
          <input type="text" id="inp-route" />
        </label>
      </div>
      <Button onClick={handleClick} colorScheme="blue">
        Button
      </Button>
      {/* <button onClick={handleClick}>Try api call</button> */}
    </div>
  );
};

export default TryApiCall;
