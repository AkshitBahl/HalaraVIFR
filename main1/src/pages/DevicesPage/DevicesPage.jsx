import React from 'react'
import VrList from '../../components/VrList/VrList'
import AccountPage from '../AccountPage/AccountPage'

const DevicesPage = () => {
  return (
    <div style={{display:"flex"}}>
      <AccountPage/>
      <VrList/>
    </div>
  )
}

export default DevicesPage
