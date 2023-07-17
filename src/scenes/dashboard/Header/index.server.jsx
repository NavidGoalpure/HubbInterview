import { Box } from '@mui/material';
import DownloadButton from './DownloadButton';

import Header from '../../../components/Header.server';
import React from 'react';

const DashboardHeader = () => {
  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
        <DownloadButton />
      </Box>
    </Box>
  );
};

export default DashboardHeader;
