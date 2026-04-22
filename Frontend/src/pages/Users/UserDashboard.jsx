import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'

const UserDashboard = () => {
  useUserAuth();
  return (
    <div>
      dashboard
    </div>
  )
}

export default UserDashboard
