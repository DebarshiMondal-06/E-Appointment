import { MdAssistantNavigation, MdPolicy, MdAdminPanelSettings } from 'react-icons/md';
import { RiHomeGearFill, RiLogoutBoxFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';


export const adminOption = [
  {
    header: "Navigation", icon: <MdAssistantNavigation />,
    sub_list: [
      { name: "Dashboard", route: "/dashboard" },
      { name: "Profile", route: "/dashboard/profile" }
    ]
  },
  {
    header: "Master Settings", icon: <RiHomeGearFill />,
    sub_list: [
      { name: "Hospitals", route: "/dashboard/hospital" },
      { name: "Payments", route: "/payment" },
      { name: "Appointments", route: "/dashboard/appointments" }
    ]
  },
  {
    header: "Users Management", icon: <FaUsers />,
    sub_list: [
      { name: "Pending Users", route: "/dashboard/pending" },
      { name: "Doctors", route: "/dashboard/doctors" },
      { name: "Patient", route: "/dashboard/patients" },
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

export const doctorOption = [
  {
    header: "Navigation", icon: <MdAssistantNavigation />,
    sub_list: [
      { name: "Dashboard", route: "/dashboard" },
      { name: "Profile", route: "/dashboard/profile" }
    ]
  },
  {
    header: "Management", icon: <FaUsers />,
    sub_list: [
      { name: "Appointments", route: "/dashboard/appointments" },
      { name: "Patients", route: "/dashboard/patients_appointed" },
      { name: "Payments", route: "/payment" }
    ]
  },
  {
    header: "CMS", icon: <MdPolicy />
  },
  {
    header: "Settings", icon: <MdAdminPanelSettings />,
    sub_list: [
      { name: "Feedback", route: "/dashboard/feedback" },
      { name: "Advance Setting", route: "/dashboard/advance" },
    ]
  },
  {
    header: "Logout", icon: <RiLogoutBoxFill />
  }
];

export const patientOption = [
  {
    header: "Navigation", icon: <MdAssistantNavigation />,
    sub_list: [
      { name: "Dashboard", route: "/dashboard" },
      { name: "Profile", route: "/dashboard/profile" }
    ]
  },
  {
    header: "Management", icon: <RiHomeGearFill />,
    sub_list: [
      { name: "Appointments", route: "/dashboard/appointments" }
    ]
  },
  {
    header: "CMS", icon: <MdPolicy />
  },
  {
    header: "Settings", icon: <MdAdminPanelSettings />,
    sub_list: [
      { name: "Feedback", route: "/dashboard/feedback" },
      { name: "Advance Setting", route: "/dashboard/advance" },
    ]
  },
  {
    header: "Logout", icon: <RiLogoutBoxFill />
  }
];
