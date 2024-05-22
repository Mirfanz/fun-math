"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/context/auth-provider";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const FeedbackUI = (props: Props) => {
  const feedbackRef = collection(db, "feedback");

  const session = useSession();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fields.message?.length < 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pesan terlalu pendek",
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Kirim Masukan?",
      text: "Masukan akan dikirim kepada developer",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Kirim",
      cancelButtonText: "Batal",
    });

    if (!isConfirmed) return;

    setSubmitting(true);

    addDoc(feedbackRef, fields)
      .then((snap) => {
        setFields((prev) => ({
          ...prev,
          message: "",
        }));
        console.log(snap);
        Swal.fire({
          icon: "success",
          title: "Terima Kasih",
          text: "Masukan anda telah dikirim",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  useEffect(() => {
    if (session.user) {
      setFields({
        ...fields,
        name: session.user.displayName || "",
        email: session.user.email || "",
      });
    }
  }, [session.stateReady]);

  return (
    <main>
      <div className="container mt-4">
        <form onSubmit={handleSubmit} action={""}>
          <div className="flex flex-col gap-2 mb-4">
            <Label className="">Your Name</Label>
            <Input
              type="text"
              placeholder="Your Name"
              value={fields.name}
              readOnly={session.isAuthenticated}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label className="">Email</Label>
            <Input
              type="email"
              placeholder="example@domain.com"
              value={fields.email}
              readOnly={session.isAuthenticated}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <Label className="">Saran / Masukan</Label>
            <Textarea
              placeholder="Ketik sesuatu disini"
              value={fields.message}
              rows={10}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, message: e.target.value }))
              }
            ></Textarea>
          </div>
          <Button type="submit" disabled={submitting}>
            <SendIcon className="w-4 h-4 me-2" />
            Kirim Masukan
          </Button>
        </form>
      </div>
    </main>
  );
};

export default FeedbackUI;
