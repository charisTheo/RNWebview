import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './styled.d.ts';
import { ThemeProvider } from 'styled-components';

import './styles/globals.css';
import App from './App';
import { SbCallsProvider } from './lib/sendbird-calls';

ReactDOM.render(
  <React.StrictMode>
    <SbCallsProvider appId="">
      <ThemeProvider theme={{ isWidget: false }}>
        <App/>
      </ThemeProvider>
    </SbCallsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

