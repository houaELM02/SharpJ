import React from 'react'
import {Link } from 'react-router-dom';
function Dashboard() {
  return (
    <>Dashboard
     <Link
                    className=" bg-purple-750  hover:bg-purple-751 text-gray-100  w-6/12  p-3 flex flex-row justify-center items-center gap-1 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    to ='/Invite'>
                    Inviter new emp
                    </Link>
					        
    </>
  )
}

export default Dashboard