import React, { useEffect, useState } from 'react'
import "./ChildItem.css"
import { Link } from 'react-router-dom'
const ChildItem = ({cdata}) => {
  return (

    <Link className='childitem' to={`/child/${cdata.id}`}>
      <p>Child id:{cdata.id}</p>
      <p>child name:{cdata.childName}</p>
      <p>vrid:{cdata.VrId}</p>
      <div>
        <Link to={`stream/${cdata.id}`}>View Stream</Link>
        <Link to={`session/${cdata.id}`}>View Session details</Link>
        <Link to={`/child/${cdata.id}`}>child Info</Link>
      </div>
    </Link>
  )
}

export default ChildItem
