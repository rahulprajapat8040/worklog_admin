"use client";
import { loginAction } from "@/app/actions/auth/login.action";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { useToast } from "@/components/ui/toast/ToastContext";
import { ILoginForm } from "@/lib/interfaces/forms/ILoginForm.interface";
import Validation from "@/utils/validation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem("LyftodeviceId");

  if (!deviceId) {
    deviceId = uuid();
    localStorage.setItem("LyftodeviceId", deviceId);
  }

  return deviceId;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({});
  const toast = useToast();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ILoginForm) => {
    startTransition(async () => {
      const payload: ILoginForm = {
        ...data,
        deviceId: getOrCreateDeviceId(),
        deviceToken: getOrCreateDeviceId(),
      };
      try {
        const res = await loginAction(payload);
        if (res.success) {
          router.push("/dashboard");
        }
      } catch (error) {
        const err = error as { message: string };
        toast.error("Error In API", err.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <button
        type="button"
        onClick={() =>
          toast.success("Saved successfully", "Your changes were saved")
        }
      >
        Save
      </button>
      <div>
        <Input
          label="Email"
          placeholder="you@yourcompany.com"
          {...register("email", {
            ...Validation.required("Email"),
            ...Validation.email,
          })}
        />
        <ErrorMessage text={errors.email?.message} />
      </div>
      <div>
        <Input
          label="Password"
          placeholder="*******"
          {...register("password", { ...Validation.required("Password") })}
        />
        <ErrorMessage text={errors.password?.message} />
      </div>
      <Button disabled={isPending}>Login</Button>
    </form>
  );
};

export default LoginForm;
