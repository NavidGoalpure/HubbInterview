import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const Dashboard = lazy(() => import('./scenes/dashboard'));
const FAQ = lazy(() => import('./scenes/faq'));
const Geography = lazy(() => import('./scenes/geography'));
const Websocket = lazy(() => import('./scenes/websocket'));
const Team = lazy(() => import('./scenes/team'));
const Contacts = lazy(() => import('./scenes/contacts'));
const Calendar = lazy(() => import('./scenes/calendar/calendar'));
const Bar = lazy(() => import('./scenes/bar'));
const Pie = lazy(() => import('./scenes/pie'));
const Line = lazy(() => import('./scenes/line'));
const Form = lazy(() => import('./scenes/form'));

const HubbRoutes = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loading />
        </div>
      }
    >
      <Routes>
        {/* ///////// */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/websocket' element={<Websocket />} />
        <Route path='/form' element={<Form />} />
        <Route path='/bar' element={<Bar />} />
        <Route path='/pie' element={<Pie />} />
        <Route path='/line' element={<Line />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/geography' element={<Geography />} />
      </Routes>
    </Suspense>
  );
};
export default HubbRoutes;
