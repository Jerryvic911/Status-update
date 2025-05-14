import React from 'react'
import Link from 'next/link'
import { IoChevronBackCircle } from "react-icons/io5";

const Profile = () => {
  return (
    <div>
      <div> 
        <Link href="/">
         <IoChevronBackCircle className='size-7' />
        </Link>
      </div>
      <h1>My Profile</h1>
    </div>
  )
}

export default Profile
