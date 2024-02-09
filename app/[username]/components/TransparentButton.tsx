"use client";
import { ButtonProps } from "@/app/interfaces/ButtonProps";
import classNames from "classnames";

export default function TransparentButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  const styles = classNames(
    "border rounded-full text-sm hover:border-gray-300 transition-colors font-semibold",
    className
  );

  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
}
