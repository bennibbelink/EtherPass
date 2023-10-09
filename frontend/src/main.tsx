import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PasswordListContextProvider } from './context/PasswordListContext.tsx'
import { TagContextProvider } from './context/TagContext.tsx'
import { EthContextProvider } from './context/EthContext.tsx'
import { MetaMaskProvider } from '@metamask/sdk-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaMaskProvider debug={false} sdkOptions={{
      logging: {
        developerMode: true,
      },
      checkInstallationImmediately: true, // This will automatically connect to MetaMask on page load
      dappMetadata: {
        name: "Demo React App",
        url: window.location.host,
      }
    }}>
      <EthContextProvider>
        <PasswordListContextProvider>
          <TagContextProvider>
            <App />
          </TagContextProvider>
        </PasswordListContextProvider >
      </EthContextProvider>
    </MetaMaskProvider>
  </React.StrictMode >
)
