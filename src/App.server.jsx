import { useState } from 'react';
import Topbar from './scenes/global/Topbar.server';
import Sidebar from './scenes/global/Sidebar.server';

import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import HubbRoutes from './Routes.server';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Sidebar isSidebar={isSidebar} />
          <main className='content'>
            <Topbar setIsSidebar={setIsSidebar} />
            <HubbRoutes />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
