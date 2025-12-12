import React, { useEffect } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration/Registration";
import TaxiRegistration from "./pages/Registration/TaxiRegistration";
import HotelRegistration from "./pages/Registration/HotelRegistration";
import GuideRegistration from "./pages/Registration/GuideRegistration";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import LoadingScreen from "./components/LoadingScreen";

import GuideAdmin from "./pages/GuideAdmin";
import StaysAdmin from "./pages/stays/StaysAdmin";
import StaysDashboard from "./pages/stays/StaysDashboard";
import StaysBookings from "./pages/stays/StaysBookings";
import StaysAccount from "./pages/stays/StaysAccount";
import AddRoom from "./pages/stays/AddRoom";

import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { TaxiAdmin } from "./pages/TaxiAdmin";

function App() {
  const { loadUser, user, isAuthChecking } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (isAuthChecking) {
    return <LoadingScreen />;
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={"/registration"} /> : <Login />}
        />

        <Route
          path="/registration"
          element={
            user?.serviceId ? (
              <Navigate to={`/profile/${user.serviceType}`} />
            ) : (
              <Registration />
            )
          }
        />

        <Route path="/registration/taxi" element={<TaxiRegistration />} />
        <Route path="/registration/hotel" element={<HotelRegistration />} />
        <Route path="/registration/guide" element={<GuideRegistration />} />

        <Route
          path="/profile/guide"
          element={user ? <GuideAdmin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile/taxi"
          element={user ? <TaxiAdmin /> : <Navigate to={"/"} />}
        />

        <Route
          path="/profile/stays"
          element={user ? <StaysAdmin /> : <Navigate to={"/"} />}
        >
          <Route index element={<StaysDashboard />} />
          <Route path="bookings" element={<StaysBookings />} />
          <Route path="account" element={<StaysAccount />} />
          <Route path="room/add" element={<AddRoom />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
