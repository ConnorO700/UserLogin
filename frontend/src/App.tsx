import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import { useState } from 'react'
import AccessTokenContext from './contexts/AccessTokenContext'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/homepage" element={<HomePage />} />
  </>
));


function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      <RouterProvider router={router} />
    </AccessTokenContext.Provider>
  )
}

export default App
