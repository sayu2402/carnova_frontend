import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const blockfunction = async (user) => {
    const newStatus = !user.user.is_blocked;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/userblock/${user.user.id}`)
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

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/userlist/");
        setUserList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchUserList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">User List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                <div className="text-sm text-gray-500">{user.user.phone_no}</div>
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
    </div>
  );
}

export default UserList;
