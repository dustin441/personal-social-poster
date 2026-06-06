"use client";

type CheckoutButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  return (
    <a href="/checkout" className={className}>
      {children}
    </a>
  );
}
