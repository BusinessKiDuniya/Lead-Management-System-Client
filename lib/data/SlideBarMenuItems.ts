import { LayoutDashboard, Phone, Users, Megaphone } from "lucide-react";

export const SlideBarMenuItems = [
  {
    title: "Dashboard",
    id: "dashboard-tab",
    icon: LayoutDashboard,
    defaultOpen: true,
    items: [
      {
        title: "Analytics",
        id: "analytics-tab",
        href: "/dashboard/analytics",
      },
    ],
  },
  {
    title: "Leads",
    id: "leads-tab",
    icon: Users,
    items: [
      {
        title: "Add Leads",
        id: "add-leads-tab",
        href: "/leads/add",
      },
      {
        title: "All Leads",
        id: "all-leads-tab",
        href: "/leads/all",
      },  
    ],
  },
  {
    title: "Follow Ups",
    id: "follow-ups-tab",
    icon: Phone,
    items: [
      {
        title: "Today's Follow Ups",
        id: "today-follow-ups-tab",
        href: "/follow-ups/today",
      },
      {
        title: "Upcoming Follow Ups",
        id: "upcoming-follow-ups-tab",
        href: "/follow-ups/upcoming",
      },
    ],
  },
  {
    title: "Team Management",
    id: "team-management-tab",
    icon: Users,
    items: [
      {
        title: "Team Members",
        id: "team-members-tab",
        href: "/team/members",
      },
      {
        title: "Task Board",
        id: "task-board-tab",
        href: "/team/tasks",
      },
    ],
  },
  {
    title: "Outreach",
    id: "outreach-tab",
    icon: Megaphone,
    items: [
      {
        title: "Broadcast",
        id: "broadcast-tab",
        href: "/broadcast",
      },
    ],
  },
];
