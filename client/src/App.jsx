import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Restaurants from './pages/Restaurants'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Logout from './pages/Logout'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// admin + owner pages
import AdminDashboard from './pages/admin/AdminDashboard'
import RestaurantManager from './pages/owner/RestaurantManager'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/logout" element={<Logout />} />

          {/* 🛒 Protected user routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* 🍽️ Restaurant owner */}
          <Route
            path="/owner/restaurants"
            element={
              <ProtectedRoute allowedRoles={['restaurant_owner']}>
                <RestaurantManager />
              </ProtectedRoute>
            }
          />

          {/* 🛠️ Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
