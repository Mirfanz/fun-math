"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/auth-provider";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AccountUI = () => {
  const session = useSession();
  const router = useRouter();

  if (!session.stateReady) return <div>Loading...</div>;
  else if (!session.user) {
    session.signIn({ type: "replace", redirectUrl: "/account" });
    return <div>no account</div>;
  }

  return (
    <main>
      <div className="container mt-4">
        <div className="flex flex-col items-center text-center p-4">
          <Avatar className="w-24 h-24 mb-3">
            <AvatarImage src={session.user?.photoURL || ""} />
            <AvatarFallback>{session.user?.displayName?.[0]}</AvatarFallback>
          </Avatar>

          <h5 className="font-medium">{session.user?.displayName}</h5>
          <small>{session.user?.email}</small>
          <Button
            size={"sm"}
            className="mt-3 "
            variant={"secondary"}
            onClick={() => {
              Swal.fire({
                text: "Apakah Anda yakin ingin LogOut?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, logout",
                confirmButtonColor: "red",
                cancelButtonText: "Batal",
                focusCancel: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  session.signOut();
                }
              });
            }}
          >
            LogOut
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AccountUI;
