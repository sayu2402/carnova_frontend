import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axios/axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const totalResult = pagination.count;
  console.log("total_results:", totalResult);

  useEffect(() => {
    fetchData(`${baseUrl}/api/userlist`);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axiosInstance.get(url);
      setUserList(response.data.results);
      setLoading(false);
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.log("error fetching userlist");
    }
  };

  const handlePageChange = (url) => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchData(url);
  };

  const links = [];
  for (let i = 1; i <= Math.ceil(totalResult / 6); i++) {
    links.push(
      <li key={i}>
        <button
          onClick={() => handlePageChange(`${baseUrl}/api/userlist/?page=${i}`)}
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white-900/10 hover:text-white active:bg-white-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
            currentPage === i ? "font-bold" : ""
          }`}
        >
          {i}
        </button>
      </li>
    );
  }

  const blockfunction = async (user) => {
    const newStatus = !user.user.is_blocked;

    try {
      const response = await axios
        .get(`${baseUrl}/api/userblock/${user.user.id}`)
        .then((response) => {
          const updateduser = userList.map((customer) => {
            if (customer.user.id === user.user.id) {
              return {
                ...customer,
                user: {
                  ...customer.user,
                  is_blocked: newStatus,
                },
              };
            }
            return customer;
          });
          setUserList(updateduser);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">User List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userList.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.user.username}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {user.user.phone_no}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`text-xs text-white ${
                    user.user.is_blocked ? "bg-green-500" : "bg-red-500"
                  } px-2 py-1`}
                  onClick={() => blockfunction(user)}
                >
                  {user.user.is_blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Area Start*/}
      <nav
        aria-label="Page navigation example"
        className="flex justify-center mt-4"
      >
        <ul className="flex items-center gap-4 list-none">
          <li>
            <button
              onClick={() =>
                pagination.previous && handlePageChange(pagination.previous)
              }
              disabled={!pagination.previous}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all ${
                !pagination.previous ? "bg-gray-400" : "bg-blue-500"
              } hover:bg-blue-600 active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            >
              Prev
            </button>
          </li>
          {links.map((link, index) => (
            <li key={index} className="">
              {link}
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                pagination.next && handlePageChange(pagination.next)
              }
              disabled={!pagination.next}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all ${
                !pagination.next ? "bg-gray-400" : "bg-blue-500"
              } hover:bg-blue-600 active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* Pagination Area End */}
    </div>
  );
}

export default UserList;
