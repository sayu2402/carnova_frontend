import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import controlImage from "../../assets/adminDashboard/control.png";
import logoImage from "../../assets/adminDashboard/logo.png";
import chartFillImage from "../../assets/adminDashboard/Chart_fill.png";
import chatImage from "../../assets/adminDashboard/Chat.png";
import userImage from "../../assets/adminDashboard/User.png";
import calendarImage from "../../assets/adminDashboard/Calendar.png";
import searchImage from "../../assets/adminDashboard/Search.png";
import chartImage from "../../assets/adminDashboard/Chart.png";
import folderImage from "../../assets/adminDashboard/Folder.png";
import settingImage from "../../assets/adminDashboard/Setting.png";


const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: chartFillImage },
    { title: "Inbox", src: chatImage },
    { title: "User List", src: userImage, gap: true, path: "/userlist" },
    { title: "Vendor List", src: userImage, gap: true, path: "/vendorlist" },
    { title: "Schedule", src: calendarImage },
    { title: "Search", src: searchImage },
    { title: "Analytics", src: chartImage },
    { title: "Files", src: folderImage, gap: true },
    { title: "Setting", src: settingImage },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logoImage}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Carnova.
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link to={Menu.path}>
                <img src={Menu.src} alt={Menu.title} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
