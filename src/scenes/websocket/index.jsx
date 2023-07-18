import { Box } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Header from '../../components/Header.server';

const Websocket = () => {
  //Public API that will echo messages sent to it back to the client
  const socketUrl = 'wss://ws.eodhistoricaldata.com/ws/crypto?api_token=demo';

  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    () => sendMessage({ action: 'subscribe', symbols: 'BTC-USD' }),
    [sendMessage]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Box m='20px'>
      <Header title='INVOICES' subtitle='List of Prices]' />

      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <br />
      <span>The WebSocket is currently {connectionStatus}</span>
      <br />

      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <br />

      <ul>
        {messageHistory.map((message, idx) => (
          <>
            <span key={idx}>{message ? message.data : null}</span>
            <br />
          </>
        ))}
      </ul>
    </Box>
  );
};

export default Websocket;
