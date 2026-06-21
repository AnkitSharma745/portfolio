import CustomBlockquote from "./mdx/CustomBlockquote";
import CustomCode from "./mdx/CustomCode";
import CustomH1 from "./mdx/CustomH1";
import CustomH2 from "./mdx/CustomH2";
import CustomH3 from "./mdx/CustomH3";
import CustomImage from "./mdx/CustomImage";
import CustomLink from "./mdx/CustomLink";
import CustomOl from "./mdx/CustomOl";
import CustomP from "./mdx/CustomP";
import CustomPre from "./mdx/CustomPre";
import CustomUl from "./mdx/CustomUl";

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
