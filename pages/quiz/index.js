/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';

function ResultadoWidget({ results }) {
  const router = useRouter();
  const { nome } = router.query;
  const totalQuestions = results.filter((x) => x).length;
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Contet>
        <span>
          {totalQuestions >= 1 ? `Parabéns ${nome}` : `Tente novamente ${nome}`}
        </span>
        <p>
          {totalQuestions === 0 ? 'Você errou todas a perguntas' : `Você acertou ${totalQuestions} perguntas`}
          {' '}
          {/* results.reduce((somatoriaAtual, resultadoAtual) => {
            const isAcerto = resultadoAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0) */}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' - '}
              Resultado :
              { result === true ? ' Acertou' : ' Errou'}
            </li>
          ))}
        </ul>
      </Widget.Contet>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Contet>
        [Desafio do Loading]
      </Widget.Contet>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionsSubmited, setIsQuestionsSubmited] = React.useState(false);
  const questionId = `question_${questionIndex}`;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const isCorrect = selectedAlternative === question.answer;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Contet>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionsSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionsSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionsSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            CONFIRMAR
          </Button>
          {isQuestionsSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionsSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Contet>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // result.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultadoWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
