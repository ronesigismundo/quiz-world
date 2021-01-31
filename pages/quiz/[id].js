/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

// eslint-disable-next-line react/prop-types
export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>

  // {/* <pre style={{ color: 'black' }}>
  //   {JSON.stringify(dbExterno.questions, null, 4)}
  // </pre> */}
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((resServer) => {
      if (resServer.ok) {
        return resServer.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((resConvertedToObj) => resConvertedToObj)
    .catch((err) => {
      console.error(err);
    });

  // console.log(dbExterno);
  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
