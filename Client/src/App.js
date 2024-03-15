import React, { useContext } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registratoin from './pages/Registration/Registratoin';
import { userContext } from './context/userContext';
import NewRoomPage from './pages/NewRoom/NewRoomPage';
import Room from './pages/Room/Room';
import Visits from './pages/Visits/Visits';
import Visitors from './pages/Visitors/Visitors';
import Wishlist from './pages/Wishlist/Wishlist';
import MyRooms from './pages/MyRooms/MyRooms';
import Invitations from './pages/Invitations/Invitations';

function App() {
  const { isLoggedIn } = useContext(userContext);

  const ProtectedRoute = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
      <Route path="/register" element={<Registratoin />} />
      <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/new-room" element={<NewRoomPage/>}/>
        <Route path="/room/:id" element={<Room/>}/>
        <Route path="/visits/:id" element={<Visits/>}/>
        <Route path="/visitors/:id" element={<Visitors/>}/>
        <Route path="/wishlist/:id" element={<Wishlist/>}/>
        <Route path="/my-rooms/:id" element={<MyRooms/>}/>
        <Route path="/invitations/:id" element={<Invitations/>}/>
      </Route>
    </Routes>

  );
}

export default App;
