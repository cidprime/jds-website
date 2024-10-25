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

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id/info' element={<CourseInfo />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/:id/course-content' element={<CourseContent />} />
        </Route>
        <Route element={<AuthorizedPrivateRoute />}>
          <Route path='/create-course' element={<CreateCourse />} />
          <Route path='/create-sections' element={<CreateSections />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}