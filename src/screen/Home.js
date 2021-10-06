import React from 'react'
import { Link } from 'react-router-dom'
import TryApiCall from '../features/TryApiCall/TryApiCall'

export default function Home() {
  return (
    <div>
      <TryApiCall />
      <ul>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </div>
  )
}
