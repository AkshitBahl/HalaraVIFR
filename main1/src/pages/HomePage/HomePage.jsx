import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/signupwithnumber">SignUpwithnumber</Link>
      <br />

    </div>
  )
}

export default HomePage
