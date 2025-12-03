import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage /> } />
    <Route path="/homepage" element={<HomePage />} />
  </>
));

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
