"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const status = useFormStatus();

  return (
    <button type="submit" aria-busy={status.pending} {...props}>
      {children}
    </button>
  );
}
