"use client";

import React from "react";
import axios from "axios";

import { lambdaRoutes } from "@capital-cities/common/config";
import { PlayHeader } from "./play-header";
import { MainCard } from "./play-main-card";

import { GetQuestionResult } from "@capital-cities/common/types";

export function MainQuestionPage() {
  const [data, setData] = React.useState<GetQuestionResult>();

  React.useEffect(() => {
    axios.get(lambdaRoutes.getQuestion).then((r) => setData(r.data));
  }, []);

  return (
    <div>
      <PlayHeader />
      <MainCard />
    </div>
  );
}
