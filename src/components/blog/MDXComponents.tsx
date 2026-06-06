"use client";

import Image from "next/image";
import Link from "next/link";
import { FaQuoteLeft } from "react-icons/fa";
import CopyButton from "@/components/CopyButton";
import { isValidElement } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const CustomLink = ({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) => {
  const isInternalLink = href.startsWith("/") || href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className="text-primary hover:underline font-medium"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline font-medium"
      {...props}
    >
      {children}
    </a>
  );
};

const CustomImage = ({ src, alt = "" }: ComponentPropsWithoutRef<"img">) => {
  if (typeof src !== "string") {
    return null;
  }

  return (
    <div className="my-8 relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        className="object-cover"
      />
    </div>
  );
};

const CustomCode = (props: ComponentPropsWithoutRef<"code">) => {
  return (
    <code
      className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  );
};

const CustomPre = (props: ComponentPropsWithoutRef<"pre">) => {
  // Extract text content from children for copy button
  const getTextContent = (children: ReactNode): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(getTextContent).join("");
    if (isValidElement<{ children?: ReactNode }>(children)) {
      return getTextContent(children.props.children);
    }
    return "";
  };

  const codeText = getTextContent(props.children);

  return (
    <div className="relative group">
      <pre
        className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl overflow-x-auto my-6 text-sm font-mono border border-white/10"
        {...props}
      />
      <CopyButton text={codeText} />
    </div>
  );
};

const CustomBlockquote = (props: ComponentPropsWithoutRef<"blockquote">) => {
  return (
    <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-foreground/80 bg-secondary/20 rounded-r-xl relative">
      <FaQuoteLeft className="absolute top-2 left-2 text-primary/20 text-xl" />
      {props.children}
    </blockquote>
  );
};

const CustomH1 = (props: ComponentPropsWithoutRef<"h1">) => (
  <h1
    className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-foreground"
    {...props}
  />
);

const CustomH2 = (props: ComponentPropsWithoutRef<"h2">) => (
  <h2
    className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-foreground flex items-center gap-2 group"
    {...props}
  >
    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity -ml-6 mr-2">
      #
    </span>
    {props.children}
  </h2>
);

const CustomH3 = (props: ComponentPropsWithoutRef<"h3">) => (
  <h3
    className="text-xl md:text-2xl font-bold mt-8 mb-4 text-foreground"
    {...props}
  />
);

const CustomP = (props: ComponentPropsWithoutRef<"p">) => (
  <p className="text-lg leading-relaxed mb-6 text-foreground/80" {...props} />
);

const CustomUl = (props: ComponentPropsWithoutRef<"ul">) => (
  <ul
    className="list-disc list-inside mb-6 space-y-2 text-foreground/80 ml-4"
    {...props}
  />
);

const CustomOl = (props: ComponentPropsWithoutRef<"ol">) => (
  <ol
    className="list-decimal list-inside mb-6 space-y-2 text-foreground/80 ml-4"
    {...props}
  />
);

const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
  code: CustomCode,
  pre: CustomPre,
  blockquote: CustomBlockquote,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: CustomP,
  ul: CustomUl,
  ol: CustomOl,
};

export default MDXComponents;
