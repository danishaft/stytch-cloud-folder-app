

import { Route, Routes } from "react-router-dom"
import { ProtectedRoutes } from "./components/ProtectedRoutes"
import { LoginOrSignup } from "./pages/LoginOrSignup"
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { Authenticate } from "./pages/Authenticate";
import { ContextProvider } from "./context/ContextProvider";
import { Modal } from "./components/Modal";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";

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
