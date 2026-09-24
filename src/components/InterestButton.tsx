"use client";

import type { ReactNode } from "react";

export const INTEREST_EVENT = "fernwood:interest";

/**
 * Jumps to the contact form and pre-fills the product/category field.
 * Works without JS as a plain anchor link to #contact.
 */
export function InterestButton({
  category,
  className = "btn--link",
  children,
}: {
  category: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={`btn ${className}`}
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: category }))}
    >
      {children}
    </a>
  );
}
