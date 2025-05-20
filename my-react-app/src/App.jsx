// App.js
import React, { useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/storee";
import { routes } from './routes/routes';
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <Provider store={store}> 
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
