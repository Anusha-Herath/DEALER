import { LayoutList } from "lucide-react";
import DashIcon from "../../assets/icons/Dashboard.png";
import RuleIcon from "../../assets/icons/Rules.png";
import ProcessIcon from "../../assets/icons/Process.png";
import ReportIcon from "../../assets/icons/Reports.png";
import NoticeIcon from "../../assets/icons/Notice.png";
export const SidebarData = [
  {
    icon: DashIcon,
    title: "Dashboard",
    href: "#",
    sublinks: [
      {
        title: "User Management",
        href: "/dealer/usermanagement",
      },
      {
        title: "Analytics",
        href: "/dealer/analytics",
      },
    ],
  },
  {
    icon: RuleIcon,
    title: "Rules",
    href: "#",
    sublinks: [
      {
        title: "Service Order Types",
        href: "/dealer/serviceordertypes",
      },
      {
        title: "Blacklist Package",
        href: "/dealer/blacklistpackage",
      },
      {
        title: "Slab Demarcation",
        href: "/dealer/slabdemarcation",
      },
      {
        title: "Package Rates",
        href: "/dealer/packagerates",
      },

      {
        title: "Bearer Rates",
        href: "/dealer/bearerrates",
      },
      {
        title: "S.Data Availability",
        href: "/dealer/salesdataavailability",
      },
    ],
  },
  {
    icon: ProcessIcon,
    title: "Process Com",
    href: "#",
    sublinks: [
      {
        title: "Dealer Commision Calculation",
        href: "/dealer/calculation",
      },
      {
        title: "Schemes",
        href: "/dealer/scheme",
      },
      {
        title: "New Schemes",
        href: "/dealer/newscheme",
      },
    ],
  },
  {
    icon: ReportIcon,
    title: "Reports",
    href: "#",
    sublinks: [
      {
        title: "Generate Report",
        href: "/dealer/generatereport",
      },
    ],
  },
  {
    icon: NoticeIcon,
    title: "Notice",
    href: "#",
    sublinks: [
      {
        title: "Promotion",
        href: "/dashboard",
      },
      {
        title: "Notifications",
        href: "/dashboard",
      },
    ],
  },
];
