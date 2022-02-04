import { MdAssistantNavigation, MdPolicy, MdAdminPanelSettings } from 'react-icons/md';
import { RiHomeGearFill, RiLogoutBoxFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';


export const arr = [
  {
    header: "Navigation", icon: <MdAssistantNavigation />,
    sub_list: [{ name: "Dashboard", route: "/dashboard" }, { name: "Profile", route: "/profile" }]
  },
  {
    header: "Master Settings", icon: <RiHomeGearFill />,
    sub_list: [
      { name: "Manage Hospitals", route: "/hospitals" },
      { name: "Manage Payment", route: "/payment" },
      { name: "Manage Appointment", route: "/appointment" }
    ]
  },
  {
    header: "Users Management", icon: <FaUsers />,
    sub_list: [
      { name: "Manage Doctors", route: "/doctors" },
      { name: "Manage Patient", route: "/patients" },
    ]
  },
  {
    header: "CMS", icon: <MdPolicy />
  },
  {
    header: "Settings", icon: <MdAdminPanelSettings />
  },
  {
    header: "Logout", icon: <RiLogoutBoxFill />
  }
];
