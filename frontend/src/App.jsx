import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import ProtectedRoute from './components/ProtectedRoute'
import CreateCourse from './pages/CreateCourse'
import CreateSections from './pages/CreateSections'
import CourseInfo from './pages/CourseInfo'
import CourseContent from './pages/CourseContent'
import Quiz from './pages/Quiz'
import Footer from './components/Footer'
import UpdateCourse from './pages/UpdateCourse'
import Contact from './pages/Contact'
import DashboardAdmin from './views/admin/DashboardAdmin'
import DashboardSuperUser from './views/superuser/DashboardSuperUser'
import DashboardUser from './views/user/DashboardUser'
import { useSelector } from 'react-redux'
import AuthorizedPrivateRoute from './components/AuthorizedPrivateRoute'
import Overview from './views/admin/Overview'
import ManageUsers from './views/admin/ManageUsers'
import ManageCourses from './views/admin/ManageCourses'
import Analytics from './views/admin/Analytics'

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id/info' element={<CourseInfo />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/:id/course-content' element={<CourseContent />} />
          <Route path='/quiz/:id' element={<Quiz />} />
        </Route>

        <Route path='/admin/dashboard' element={
            <ProtectedRoute allowedRoles={[2584]}>
              <DashboardAdmin />  
            </ProtectedRoute>
          }>
            <Route path='/admin/dashboard/overview' element={<Overview />} />
            <Route path='/admin/dashboard/manage-users' element={<ManageUsers />} />
            <Route path='/admin/dashboard/manage-courses' element={<ManageCourses />} />
            <Route path='/admin/dashboard/analytics' element={<Analytics />} />
        </Route>

        <Route path='/superUser/dashboard' element={
          <ProtectedRoute allowedRoles={[4987]}>
            <DashboardSuperUser />  
          </ProtectedRoute>
        } />

        <Route path='/user/dashboard' element={
          <ProtectedRoute allowedRoles={[4181]}>
            <DashboardUser />  
          </ProtectedRoute>
        } />

        <Route element={<AuthorizedPrivateRoute />}>
          <Route path='/create-course' element={<CreateCourse />} />
          <Route path='/update-course/:id' element={<UpdateCourse />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}