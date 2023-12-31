import { Button, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import React from 'react';

const DownloadButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '10px 20px',
      }}
    >
      <DownloadOutlinedIcon sx={{ mr: '10px' }} />
      Download Reports
    </Button>
  );
};

export default DownloadButton;
