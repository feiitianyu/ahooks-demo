import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#F0C54F' }
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
);

