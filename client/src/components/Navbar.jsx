import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user } = useAuth()

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">FoodOrder</h1>
      <ul className="flex space-x-4 text-gray-700 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        {user && user.role === 'user' && (
          <>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </>
        )}
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {user && (
          <>
            <li>Hello, {user.name}</li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
