export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: "ion:home-sharp",
    active: true,
    collapsible: false,
    sublist: [
      {
        title: "Dashboard",
        path: "/",
        active: false,
        collapsible: false,
      },
      {
        title: "Sales",
        path: "/",
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: "Pages",
    path: "#!",
    icon: "icomoon-free:drawer",
    active: false,
    collapsible: false,
    sublist: [
      {
        title: "Profile",
        path: "#!",
        active: false,
        collapsible: false,
        sublist: [
          {
            title: "Overview",
            path: "#!",
            active: false,
            collapsible: false,
          },
          {
            title: "All Projects",
            path: "#!",
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: "Users",
        path: "#!",
        active: false,
        collapsible: false,
        sublist: [
          {
            title: "All Users",
            path: "#!",
            active: false,
            collapsible: false,
          },
          {
            title: "Add user",
            path: "#!",
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: "Account",
        path: "#!",
        active: false,
        collapsible: false,
        sublist: [
          {
            title: "Setting",
            path: "#!",
            active: false,
            collapsible: false,
          },
          {
            title: "Billing",
            path: "#!",
            active: false,
            collapsible: false,
          },
          {
            title: "Invoice",
            path: "#!",
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: "Projects",
        path: "#!",
        active: false,
        collapsible: false,
        sublist: [
          {
            title: "Timeline",
            path: "#!",
            active: false,
            collapsible: false,
          },
        ],
      },
    ],
  },
  {
    title: "Authentication",
    path: "authentication",
    icon: "f7:exclamationmark-shield-fill",
    active: true,
    collapsible: true,
    sublist: [
      {
        title: "Sign In",
        path: "login",
        active: true,
        collapsible: false,
      },
      {
        title: "Sign Up",
        path: "sign-up",
        active: true,
        collapsible: false,
      },
      {
        title: "Forgot password",
        path: "forgot-password",
        active: true,
        collapsible: false,
      },
      {
        title: "Reset password",
        path: "reset-password",
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: "Notification",
    path: "#!",
    icon: "zondicons:notifications",
    active: false,
    collapsible: false,
  },
  {
    title: "Calendar",
    path: "#!",
    icon: "ph:calendar",
    active: false,
    collapsible: false,
  },
  {
    title: "Message",
    path: "message",
    icon: "ph:chat-circle-dots-fill",
    active: false,
    collapsible: false,
  },
];

export default navItems;
