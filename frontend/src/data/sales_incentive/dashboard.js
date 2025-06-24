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
        href: "/salesincentive/usermanage",
      },
      {
        title: "Analytics",
        href: "/salesincentive/analytics",
      },
    ],
  },
  {
    icon: RuleIcon,
    title: "Rules",
    href: "#",
    sublinks: [
      {
        title: "Product Eligibility",
        href: "/salesincentive/producteligibility",
      },
      {
        title: "Slab levels",
        href: "/salesincentive/slablevel",
      },
      {
        title: "Payment Stages",
        href: "/salesincentive/paymentstages",
      },
      {
        title: "Exclusion Packages",
        href: "/salesincentive/exclusionpackages",
      },
      {
        title: "Bearer PCR",
        href: "/salesincentive/bearerpcr",
      },
      {
        title: "PEO Packages PCR",
        href: "/salesincentive/peopackages",
      },
      {
        title: "BB Packages PCR",
        href: "/salesincentive/bbpackages",
      },
      {
        title: "LTE BB Package",
        href: "/salesincentive/ltepackage",
      },
      {
        title: "LTE BB Package PCR",
        href: "/salesincentive/ltepackagepcr",
      },
      {
        title: "Unlimited Voice Package",
        href: "/salesincentive/unlimitedvoice",
      },
      {
        title: "S.Data Availability",
        href: "/salesincentive/dataavailability",
      },
    ],
  },
  {
    icon: ProcessIcon,
    title: "Process Com",
    href: "#",
    sublinks: [
      {
        title: "Incentive Calculation",
        href: "/salesincentive/calculation",
      },
      {
        title: "Schema",
        href: "/salesincentive/schema",
      },
    ],
  },
  {
    icon: ReportIcon,
    title: "Reports",
    href: "#",
    sublinks: [
      {
        title: "Detailed Report",
        href: "/salesincentive/detailreport",
      },
      {
        title: "Summary Report",
        href: "/salesincentive/summaryreport",
      },
      {
        title: "Package Summary",
        href: "/salesincentive/packagesummary",
      },
      {
        title: "Summary File Fins",
        href: "/salesincentive/summaryfile",
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
