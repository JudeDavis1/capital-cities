"use client";

import React from "react";

import { PlayHeader } from "./play-header";
import { MainCard } from "./play-main-card";

import { GetQuestionResult, Question } from "@capital-cities/common/types";
import { Loader2 } from "lucide-react";
import { fetchQuestions } from "@/app/services/fetch-questions";

export function MainQuestionPage() {
  const [reload, setReload] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState<GetQuestionResult>();
  const [randomQuestion, setRandomQuestion] = React.useState<Question>();

  React.useEffect(() => {
    if (reload) {
      fetchQuestions()
        .then((data) => {
          setData(data);
          setReload(false);

          // Pick a random question
          const idx = Math.floor(Math.random() * data.questions.length);
          const randomQuestion = data.questions[idx];
          setRandomQuestion(randomQuestion);
        })
        .catch(() => setIsError(true));
    }
  }, [reload]);

  return (
    <div className="p-2">
      <PlayHeader setReload={setReload} />

      {!isError ? (
        !reload && data ? (
          <MainCard question={randomQuestion!} setReload={setReload} />
        ) : (
          <Loader2 className="animate-spin flex justify-center mx-auto" />
        )
      ) : null}
    </div>
  );
}
