import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { ReviewProvider } from "./context/ReviewContext";
import { MessageProvider } from "./context/MessageContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SafetyProvider } from "./context/SafetyContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import SignUpStudent from "./pages/auth/SignUpStudent";
import SignUpEmployer from "./pages/auth/SignUpEmployer";
import StudentDashboard from "./pages/student/StudentDashboard";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import ProfileStudent from "./pages/student/ProfileStudent";
import ProfileEmployer from "./pages/employer/ProfileEmployer";
import MessagingPage from "./pages/messaging/MessagingPage";
import FAQPage from "./pages/common/FAQPage";
import AboutUsPage from "./pages/common/AboutUsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <ReviewProvider>
            <MessageProvider>
              <NotificationProvider>
                <SafetyProvider>
                  <AnalyticsProvider>
                    <Toaster position="top-right" />
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<LandingPage />} />
                        <Route
                          path="/signup/student"
                          element={<SignUpStudent />}
                        />
                        <Route
                          path="/signup/employer"
                          element={<SignUpEmployer />}
                        />
                        <Route
                          path="/dashboard/student"
                          element={
                            <ProtectedRoute requiredUserType="student">
                              <StudentDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/dashboard/employer"
                          element={
                            <ProtectedRoute requiredUserType="employer">
                              <EmployerDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/profile/student"
                          element={
                            <ProtectedRoute requiredUserType="student">
                              <ProfileStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/profile/employer"
                          element={
                            <ProtectedRoute requiredUserType="employer">
                              <ProfileEmployer />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/messages"
                          element={
                            <ProtectedRoute>
                              <MessagingPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Route>
                    </Routes>
                  </AnalyticsProvider>
                </SafetyProvider>
              </NotificationProvider>
            </MessageProvider>
          </ReviewProvider>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
