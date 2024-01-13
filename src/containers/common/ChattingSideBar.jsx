import React from 'react'

const ChattingSideBar = () => {
  return (
    <>
     <ul>
          {/* Sample list of people */}
          <li className="mb-2 cursor-pointer hover:bg-gray-300 p-2 rounded">
            User 1
          </li>
          <li className="mb-2 cursor-pointer hover:bg-gray-300 p-2 rounded">
            User 2
          </li>
          {/* Add more list items as needed */}
        </ul></>
  )
}

export default ChattingSideBar
