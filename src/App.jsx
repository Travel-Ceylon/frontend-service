import React, { useEffect } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration/Registration";
import TaxiRegistration from "./pages/Registration/TaxiRegistration";
import HotelRegistration from "./pages/Registration/HotelRegistration";
import GuideRegistration from "./pages/Registration/GuideRegistration";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import LoadingScreen from "./components/LoadingScreen";

// Admin/Provider Pages
import GuideAdmin from "./pages/GuideAdmin";
import StaysAdmin from "./pages/stays/StaysAdmin";
import StaysDashboard from "./pages/stays/StaysDashboard";
import StaysBookings from "./pages/stays/StaysBookings";
import StaysAccount from "./pages/stays/StaysAccount";
import AddRoom from "./pages/stays/AddRoom";
import { TaxiAdmin } from "./pages/TaxiAdmin";

import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
  const { loadUser, user, isAuthChecking } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isAuthChecking) {
    return (
      <LoadingScreen />
    )
  }

  // Helper function to determine the correct profile path
  const getDestinationPath = (user) => {
    // if the user object is unexpectedly empty or null, but we passed the auth check,
    // it means they are not logged in/session expired. Send to login.
    if (!user) {
      return "/";
    }

    // If the user object is loaded and contains the service details, send them to their dashboard.
    if (user.serviceId && user.serviceType) {
      return `/profile/${user.serviceType}`; // e.g., /profile/taxi
    }

    // If the user is loaded but service details are missing, send to registration choice.
    return "/registration";
  };

  return (
    <>
      {user && <Navbar />}
      <Routes>
        {/*Directly determines where a logged-in user should go. */}

        <Route
          path="/"
          element={
            user ? <Navigate to={getDestinationPath(user)} /> : <Login />
          }
        />

        {/* Ensures already-registered users are bounced away. */}

        <Route
          path="/registration"
          element={
            user ? (
              user?.serviceId ? (
                //If they are registered (e.g., user is Taxi admin),
                // send them to their admin dashboard instead of showing registration again.
                <Navigate to={getDestinationPath(user)} />
              ) : (
                <Registration />
              )
            ) : (
              // Not logged in, send to login
              <Navigate to={"/"} />
            )
          }
        />
        {/* Specific Registration Forms (No changes here) */}

        <Route path="/registration/taxi" element={<TaxiRegistration />} />

        <Route path="/registration/hotel" element={<HotelRegistration />} />

        <Route path="/registration/guide" element={<GuideRegistration />} />

        {/* (These are your dashboards, and they remain the final destination) */}

        <Route
          path="/profile/guide"
          element={user ? <GuideAdmin /> : <Navigate to={"/"} />}
        />

        <Route
          path="/profile/taxi"
          element={user ? <TaxiAdmin /> : <Navigate to={"/"} />}
        />

        <Route path='/profile/stays' element={user ? <StaysAdmin /> : <Navigate to={"/"} />}>
          <Route index element={<StaysDashboard />} />
          <Route path='bookings' element={<StaysBookings />} />
          <Route path='account' element={<StaysAccount />} />
          <Route path='room/add' element={<AddRoom/>}/>
        </Route>
        {/*Redirect any unknown path to the central logic */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to={getDestinationPath(user)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App