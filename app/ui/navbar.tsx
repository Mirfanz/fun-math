"use client";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  AlertCircleIcon,
  AlignRightIcon,
  BiohazardIcon,
  BrainIcon,
  Code2Icon,
  CodeIcon,
  CogIcon,
  Gamepad2Icon,
  HomeIcon,
  LayoutDashboardIcon,
  LayoutPanelLeftIcon,
  LibrarySquareIcon,
  LogOutIcon,
  MailQuestionIcon,
  MessagesSquareIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useSession } from "@/context/auth-provider";

type Props = {};

const Navbar = ({}: Props) => {
  const session = useSession();
  const pathname = usePathname();
  const listNavItem = [
    {
      label: "Games",
      icon: <LayoutDashboardIcon className="w-4 h-4" />,
      active: pathname === "/" || pathname.startsWith("/game"),
      path: "/",
    },
    {
      label: "Live Chat",
      icon: <MessagesSquareIcon className="w-4 h-4" />,
      active: pathname === "/chats",
      path: "/chats",
    },
    {
      label: "Feedback",
      icon: <MailQuestionIcon className="w-4 h-4" />,
      active: pathname === "/feedback",
      path: "/feedback",
    },
    {
      label: "Account",
      icon: <UserIcon className="w-4 h-4" />,
      active: pathname === "/account",
      path: "/account",
    },
  ];

  return (
    <nav className="bg-slate-200 z-50 sticky top-0">
      <div className="container">
        <div className="flex py-3 items-center justify-between">
          <div className="text-xl font-bold gap-2 text-teal-600 flex items-center">
            <BiohazardIcon strokeWidth={2.3} className="w-6 h-6" />
            FunMath
          </div>
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"} size={"icon"}>
                <AlignRightIcon className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="px-3 ">
              <div className="text-xl mb-4 ms-2 w-max  font-bold gap-2 text-teal-600 flex items-center">
                <BiohazardIcon strokeWidth={2.3} className="w-6 h-6" />
                FunMath
              </div>

              {listNavItem.map((item, index) => (
                <Link
                  key={"nav-item-" + index}
                  href={item.path}
                  className={
                    "flex duration-150 mb-2 hover:bg-slate-100 bg-slate-50 active:bg-slate-200 p-3 rounded-lg gap-3 items-center " +
                    (item.active
                      ? "text-teal-600 !bg-slate-200 font-medium"
                      : "")
                  }
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <div className="absolute bottom-0 p-3 left-0 right-0 w-full">
                {session.user ? (
                  <>
                    <Card className="flex gap-2 p-3 rounded-lg items-center">
                      <Avatar className="">
                        <AvatarImage src={session.user.photoURL || ""} />
                        <AvatarFallback>
                          {session.user.displayName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="me-auto">
                        <h4 className="font-medium">
                          {session.user.displayName}
                        </h4>
                        <p className="text-sm w-full line-clamp-1">
                          {session.user.email}
                        </p>
                      </div>
                    </Card>
                  </>
                ) : (
                  <>
                    <Alert>
                      <AlertTitle>Kamu Siapa?</AlertTitle>
                      <AlertDescription>
                        Silahkan masuk ke akunmu dulu.
                      </AlertDescription>
                      <Button className="w-full mt-3" size={"sm"}>
                        SignIn Account
                      </Button>
                    </Alert>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
