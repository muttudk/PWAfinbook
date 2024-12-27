import React from 'react'
import { Outlet } from 'react-router-dom'

function Reports() {
  return (
    <div>
      <h1>Reports Page</h1>
      <Outlet/>
    </div>
  )
}

export default Reports
