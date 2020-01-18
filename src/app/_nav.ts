interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: "Home Page",
    url: "/dashboard",
    icon: "icon-speedometer",
    badge: {
      variant: "info",
      text: "NEW"
    }
  },
  {
    title: true,
    name: "Title 1"
  },
  {
    name: "Parent Node",
    url: "/dashboard",
    icon: "icon-drop"
  },
  {
    title: true,
    name: "Title 2"
  },
  {
    name: "Parent Node",
    url: "/dashboard",
    icon: "icon-puzzle",
    children: [
      {
        name: "Child Node 1",
        url: "/dashboard",
        icon: "icon-puzzle"
      },
      {
        name: "Child Node 2",
        url: "/dashboard",
        icon: "icon-puzzle"
      }
    ]
  }
];
