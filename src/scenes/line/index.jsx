import { Box } from '@mui/material';
import Header from '../../components/Header.server';
import LineChart from '../../components/LineChart.server';

const Line = () => {
  return (
    <Box m='20px'>
      <Header title='Line Chart' subtitle='Simple Line Chart' />
      <Box height='75vh'>
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
