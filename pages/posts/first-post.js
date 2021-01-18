import Link from "next/link";
import Head from "next/head";

export default function firstPost() {
  return (
    <>
      <Head>
        <title>First post</title>
      </Head>
      <h1>First post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
