"use client";
import { Button } from "@/components/ui/button";
import { AlignRightIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="bg-slate-200">
      <div className="container">
        <div className="flex py-3 items-center justify-between">
          <div className="text-xl font-bold text-teal-600">FanGame</div>
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"} size={"icon"}>
                <AlignRightIcon className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Hallo Gesss</SheetTitle>
                <SheetDescription>
                  Gatau disini mau dikasih apaan <br /> Belum jadi, sabar ya :)
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
