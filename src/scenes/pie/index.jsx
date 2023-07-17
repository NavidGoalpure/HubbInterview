import { Box } from '@mui/material';
import Header from '../../components/Header.server';
import PieChart from '../../components/PieChart.server';

const Pie = () => {
  return (
    <Box m='20px'>
      <Header title='Pie Chart' subtitle='Simple Pie Chart' />
      <Box height='75vh'>
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
