import Head from "next/head";

export default function Metatags() {
  const title = "RegEx AI | Generate Regular Expressions with AI";
  const description =
    "Generate Regular Expressions with AI from natural language descriptions.";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://regexai.vanxh.dev/" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@vanxhh" />
      <meta name="twitter:creator" content="@vanxhh" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
