import { Box } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Header from '../../components/Header.server';

const Websocket = () => {
  //Public API that will echo messages sent to it back to the client
  const socketUrl = 'wss://ws.eodhistoricaldata.com/ws/crypto?api_token=demo';

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);

  const handleDisconnectWS = useCallback(
    () =>
      sendJsonMessage({ action: 'unsubscribe', symbols: 'BTC-USD,ETH-USD' }),
    // eslint-disable-next-line no-use-before-define
    [sendJsonMessage]
  );

  useEffect(() => {
    return () => {
      // Make sure to close the WebSocket connection when the component is unmounted
      // This is important to prevent memory leaks and unnecessary connections
      handleDisconnectWS();
    };
  }, [handleDisconnectWS]);

  const handleClickSendMessage = useCallback(
    () => sendJsonMessage({ action: 'subscribe', symbols: 'BTC-USD,ETH-USD' }),
    [sendJsonMessage]
  );

  useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  console.log('navid msg=', lastJsonMessage);
  console.log('navid =============');
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
      {lastJsonMessage ? (
        <span>Last message: {lastJsonMessage.data}</span>
      ) : null}
      <br />
    </Box>
  );
};

export default Websocket;
