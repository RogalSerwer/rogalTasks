import { createContext, useState } from 'react'
import Page from './page/page.jsx'
import Login from './login/login.jsx'
import './App.css'
import './css/fontello.css'
import { useCookies } from 'react-cookie'
import { useAppContext } from './utils/consts/AppContext.jsx'
import { WindowProvider } from './utils/window/WindowContext.jsx'

import rogal from '../assets/rogal.png';

function App() {

  const context = useAppContext();
  return <>
    <WindowProvider>
      
        <div className='top-0px w-[100%] mx-auto my-[0.5vw] border-dashed border-b-3 border-[var(--color-accent)] rounded-[0.5vw]' id='logoContainer'>
          <img className='my-[1rem] mx-auto w-[calc(13vh+3vw)] block' draggable={false} src={rogal}></img>
        </div>
        {context.userID ? <Page /> : <Login />}
    </WindowProvider>
  </>
}

export default App
