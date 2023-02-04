import dynamic from "next/dynamic";
import Head from "next/head";

const NewPlayer = dynamic(
  () => {
    return import("../../components/NewPlayer");
  },
  { ssr: false }
);
// const ZoomPlayer = dynamic(
//   () => {
//     return import("../../components/zoomPlayer");
//   },
//   { ssr: false }
// );

// This gets called on every request
export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}

const Meet = ({ query }) => {
  const {
    id: meetingNumber,
    password: passWord,
    username: userName,
    useremail: userEmail,
  } = query;
  return (
    <>
      <Head>
        <link type="text/css" rel="stylesheet" href="/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="/react-select.css" />
      </Head>
      <NewPlayer
        meetingNumber={meetingNumber}
        passWord={passWord}
        userName={userName}
        userEmail={userEmail}
      />
    </>
  );
};

export default Meet;
