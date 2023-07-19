import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Header from '../../components/Header.server';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tokens } from '../../theme';

interface Message {
  s: string;
  p: number;
  q: number;
  dc: number;
  dd: number;
  t: number;
}

const Websocket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Public API that will echo messages sent to it back to the client
  const socketUrl = 'wss://ws.eodhistoricaldata.com/ws/crypto?api_token=demo';

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);
  const [btcPrice, setBTCPrice] = useState<Message>({} as Message);

  useEffect(() => {
    const lastMessage: Message = lastJsonMessage as unknown as Message;
    if (lastMessage?.s === 'BTC-USD') {
      setBTCPrice(lastMessage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  const handleDisconnectWS = useCallback(
    () => sendJsonMessage({ action: 'unsubscribe', symbols: 'BTC-USD' }),
    // eslint-disable-next-line no-use-before-define
    [sendJsonMessage]
  );

  const handleClickSendMessage = useCallback(
    () => sendJsonMessage({ action: 'subscribe', symbols: 'BTC-USD' }),
    [sendJsonMessage]
  );

  useEffect(() => {
    handleClickSendMessage();
    return () => {
      // Make sure to close the WebSocket connection when the component is unmounted
      // This is important to prevent memory leaks and unnecessary connections
      handleDisconnectWS();
    };
  }, [handleClickSendMessage, handleDisconnectWS]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Box m='20px'>
      <Header
        title='Example Of Using Websocket To display Bitcoin Price Information'
        subtitle='Data is displayed from eodhistoricaldata.com API'
      />

      <Box
        height='75vh'
        sx={{
          '& .MuiTableRow-root': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiTableRow-head': {
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },

          //
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='caption table'>
            <Typography
              component='caption'
              variant='caption'
              sx={{
                backgroundColor: colors.blueAccent[700],
              }}
            >
              The WebSocket is currently
              <span
                style={{
                  color: colors.blueAccent[100],
                  marginLeft: '0.5rem',
                  fontWeight: 'bolder',
                }}
              >
                {connectionStatus}
              </span>
            </Typography>
            <TableHead>
              <TableRow>
                <TableCell>Coin Pair</TableCell>
                <TableCell align='right'>Price in USD</TableCell>
                <TableCell align='right'>Quantity Of The Trade</TableCell>
                <TableCell align='right'>Daily Change Percentage</TableCell>
                <TableCell align='right'>Daily Difference Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={'btc'}>
                <TableCell component='th' scope='row'>
                  {'BTC-USD'}
                </TableCell>
                <TableCell align='right'>{btcPrice.p}</TableCell>
                <TableCell align='right'>{btcPrice.q}</TableCell>
                <TableCell align='right'>{btcPrice.dc}</TableCell>
                <TableCell align='right'>{btcPrice.dd}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Box
          sx={{
            '& .MuiButton-root': {
              backgroundColor: colors.redAccent[700],
              color: colors.redAccent[100],
            },
            '& .MuiButton-root:hover': {
              backgroundColor: colors.redAccent[800],
            },

            //
          }}
        >
          <Button onClick={handleDisconnectWS}>Stop</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Websocket;
