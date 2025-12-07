import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './components/Layout'
import UserRegister from './components/user/UserRegister'
import UserLogin from './components/user/UserLogin'
import DashboardLayout from './components/DashboardLayout'
import UserProfile from './components/user/UserProfile'
import UserLogout from './components/user/UserLogout'
import ContactCreate from './components/contact/ContactCreate'
import ContactList from './components/contact/ContactList'
import ContactEdit from './components/contact/ContactEdit'
import ContactDetail from './components/contact/ContactDetail'
import AddressCreate from './components/address/AddressCreate'
import AddressEdit from './components/address/AddressEdit'
import Home from './components/protectRoute/Home'
import ProtectedRoute from './components/protectRoute/ProtectedRoute'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Rute Awal untuk Pengalihan */}
        <Route path='/' element={<Home />} />

        {/* Rute Publik (Login & Register) */}
        <Route element={<Layout />}>
          <Route path='/register' element={<UserRegister />} />
          <Route path='/login' element={<UserLogin />} />
        </Route>

        {/* Rute yang Dilindungi */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>

          <Route path='users'>
            <Route path='profile' element={<UserProfile />} />
            <Route path='logout' element={<UserLogout />} />
          </Route>

          <Route path='contacts'>
            <Route index element={<ContactList />} />
            <Route path='create' element={<ContactCreate />} />
            <Route path=':id'>
              <Route index element={<ContactDetail />} />
              <Route path='edit' element={<ContactEdit />} />
              <Route path='addresses'>
                <Route path='create' element={<AddressCreate />} />
                <Route path=':addressId/edit' element={<AddressEdit />} />
              </Route>
            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
