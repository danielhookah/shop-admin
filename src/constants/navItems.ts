import {
  faHospitalUser,
  faClipboardList,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

export const navItems = [
  {
    label: "Wizyty",
    icon: faHospitalUser,
    private: false,
    dropdownItems: [
      {
        path: "/services",
        label: "Usługi",
        private: false,
        type: "link",
      },
      {
        path: "/specialists",
        label: "Specjaliści",
        private: false,
        type: "link",
      },
      {
        path: "/appointments/history",
        label: "Historia wizyt",
        private: false,
        type: "link",
      },
    ],
  },
  {
    label: "Terapia",
    icon: faClipboardList,
    private: false,
    dropdownItems: [
      {
        path: "/dummy",
        label: "Dummy",
        private: false,
        type: "link",
      },
    ],
  },
  {
    label: "Materiały pomocnicze",
    icon: faBook,
    private: false,
    dropdownItems: [
      {
        path: "/dummy",
        label: "Dummy",
        private: false,
        type: "link",
      },
    ],
  },
  {
    label: "Baza wiedzy",
    private: false,
    dropdownItems: [
      {
        path: "/dummy",
        label: "Dummy",
        private: false,
        type: "link",
      },
    ],
  },
];
