import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

/*
const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`
*/
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (

    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz World</title>
        <meta property="og:title" content="Quiz World" key="title" />
        <meta property="og:description" content="Uma aplicação feita na semana de imersão React da Alura e a cada dia ganha mais forma." key="description" />
        <meta property="og:image" content={db.bg} key="image" />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>The legend of zelda</h1>
          </Widget.Header>
          <Widget.Contet>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?nome=${name}`);
            }}
            >
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Diz ai seu nome par jogar :)"
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar
                {name}
              </button>
            </form>
          </Widget.Contet>
        </Widget>

        <Widget>
          <Widget.Contet>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Contet>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ronesigismundo/quiz-world.git" />
    </QuizBackground>
  );
}
