import React from "react";

const ChangePasswordModal = React.memo(({ closeChangePasswordModal, handlePasswordChange }) => (
  <div className="bg-white p-8 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Change Password</h2>
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-5 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-4" onSubmit={handlePasswordChange}>
        <div>
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter current password"
            required
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label
            htmlFor="newPassword2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="newPassword2"
            id="newPassword2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      onClick={closeChangePasswordModal}
    >
      Close
    </button>
  </div>
));

export default ChangePasswordModal;