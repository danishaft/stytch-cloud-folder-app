

import { Route, Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { ProtectedRoutes } from "./components/ProtectedRoutes"
import { LoginOrSignup } from "./components/LoginOrSignup"
import { NotFound } from "./components/NotFound";
import { Layout } from "./components/Layout";
import { Authenticate } from "./components/Authenticate";
import {Profile} from './components/Profile'
import { ContextProvider } from "./context/ContextProvider";
import { Modal } from "./components/Modal";

// Route constants
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTHENTICATE: '/authenticate',
  PROFILE: '/profile/update'
};

function App() {

  return (
    <ContextProvider>
      <div className="relative">
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginOrSignup/>}/>
          <Route path={ROUTES.AUTHENTICATE} element={<Authenticate/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
            <Route element={<Layout/>}>
              <Route path={ROUTES.HOME} element={<Home/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Modal/>
      </div>
    </ContextProvider>
  )
}

export default App
