import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import AuthorizedPrivateRoute from './components/AuthorizedPrivateRoute'
import CreateCourse from './pages/CreateCourse'
import CreateSections from './pages/CreateSections'
import CourseInfo from './pages/CourseInfo'
import CourseContent from './pages/CourseContent'
import Quiz from './pages/Quiz'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import UpdateCourse from './pages/UpdateCourse'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id/info' element={<CourseInfo />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/contact' element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/:id/course-content' element={<CourseContent />} />
          <Route path='/quiz/:id' element={<Quiz />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AuthorizedPrivateRoute />}>
          <Route path='/create-course' element={<CreateCourse />} />
          <Route path='/update-course/:id' element={<UpdateCourse />} />
          <Route path='/create-sections' element={<CreateSections />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}