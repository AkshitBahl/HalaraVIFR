import { Route, Routes } from "react-router-dom";

import AccountPage from "./pages/AccountPage/AccountPage";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import SignUp from "./pages/SignUpPage/SignUp";
import SignIn from "./pages/SignInPage/SignIn";
import VrRegistrationPage from "./pages/VrRegistrationPage/VrRegistrationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DevicesPage from "./pages/DevicesPage/DevicesPage";
import ChildInfo from "./pages/ChildInfo/ChildInfo";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AllChildrens from "./pages/AllChildrens/AllChildrens";
import SessionPage from "./pages/SessionPage/SessionPage";
import StreamPage from "./pages/StreamPage/StreamPage";
import SignUpPhone from "./pages/SignUpPage/SignUpPhone";
import SignInPhone from "./pages/SignInPage/SignInPhone";
import Terms from "./pages/TermsPage/Terms";
import Privacy from "./pages/PrivacyPage/Privacy";
function App() {
  return (
    <div >
      <AuthContextProvider>
      {/* <AccountPage/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupwithnumber" element={<SignUpPhone />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signinwithnumber" element={<SignInPhone />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vrregistration"
            element={
              <ProtectedRoute>
                <VrRegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <DevicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/child/:childid"
            element={
              <ProtectedRoute>
                <ChildInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute>
                <UserProfilePage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/child"
            element={
              <ProtectedRoute>
                <AllChildrens/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/child/session/:childid"
            element={
              <ProtectedRoute>
                <SessionPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/child/stream/:childid"
            element={
              <ProtectedRoute>
                <StreamPage/>
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </AuthContextProvider>
    </div>
  );
}

export default App;
