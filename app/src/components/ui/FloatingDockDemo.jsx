import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconSettings,
  IconLogin2,
  IconHome,
  IconNewSection,
  IconInfoCircle,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Home",
    },
    {
      title: "Login",
      icon: (
        <IconLogin2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Signup",
    },
    {
      title: "About Us",
      icon: (
        <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/About-Us",
    },
    
    {
      title: "Settings",
      icon: (
        <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Settings",
    },
    
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/GitHub",
    },
  ];
  
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2">
      <FloatingDock
        mobileClassName="translate-x-20"
        items={links}
      />
    </div>
  );
}