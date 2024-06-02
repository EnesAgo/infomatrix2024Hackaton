import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      {/*<Head />*/}
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        </Head>
      <body className={"bg-[#f6f5f7]"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

