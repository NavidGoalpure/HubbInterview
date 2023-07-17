import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// const Dashboard = lazyWithRetry(() => import('./scenes/dashboard'));
// const FAQ = lazyWithRetry(() => import('./scenes/faq'));
// const Geography = lazyWithRetry(() => import('./scenes/geography'));
// const Invoices = lazyWithRetry(() => import('./scenes/invoices'));
// const Team = lazyWithRetry(() => import('./scenes/team'));
// const Contacts = lazyWithRetry(() => import('./scenes/contacts'));
// const Calendar = lazyWithRetry(() => import('./scenes/calendar/calendar'));
// const Bar = lazyWithRetry(() => import('./scenes/bar'));
// const Pie = lazyWithRetry(() => import('./scenes/pie'));
// const Line = lazyWithRetry(() => import('./scenes/line'));
const Dashboard = lazy(() => import('./scenes/dashboard'));
const FAQ = lazy(() => import('./scenes/faq'));
const Geography = lazy(() => import('./scenes/geography'));
const Invoices = lazy(() => import('./scenes/invoices'));
const Team = lazy(() => import('./scenes/team'));
const Contacts = lazy(() => import('./scenes/contacts'));
const Calendar = lazy(() => import('./scenes/calendar/calendar'));
const Bar = lazy(() => import('./scenes/bar'));
const Pie = lazy(() => import('./scenes/pie'));
const Line = lazy(() => import('./scenes/line'));
const Form = lazy(() => import('./scenes/form'));

const HubbRoutes = () => {
  console.log('navid inja1');

  return (
    <Suspense
      fallback={() => {
        console.log('navid inja2');
        return (
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
        );
      }}
    >
      <Routes>
        {/* ///////// */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/invoices' element={<Invoices />} />
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
