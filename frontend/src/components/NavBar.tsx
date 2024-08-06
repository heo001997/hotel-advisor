import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shadcnui/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcnui/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/shadcnui/components/ui/button";
import {Home, Menu} from "lucide-react";
import { ModeToggle } from "./mode-toggle";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#hotels",
    label: "Hotels",
  },
  {
    href: "#flights",
    label: "Flights",
  },
  {
    href: "#car-rentals",
    label: "Car Rentals",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex gap-1"
            >
              <Home />
              Hotel Advisor
            </a>
          </NavigationMenuItem>

          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              rel="noreferrer noopener"
              href="https://github.com/heo001997"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
