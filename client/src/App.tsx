

import { Route, Routes } from "react-router-dom"
import { ContextProvider } from "./context/ContextProvider";
import { Authenticate, Home, LoginOrSignup, NotFound, Register } from "./pages";
import { Layout, Modal, ProtectedRoutes } from "./components";

// Route constants
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTHENTICATE: '/authenticate',
  REGISTER: '/register'
};

function App() {

  return (
    <ContextProvider>
      <div className="relative">
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginOrSignup/>}/>
          <Route path={ROUTES.AUTHENTICATE} element={<Authenticate/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path={ROUTES.REGISTER} element={<Register/>}/>
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
