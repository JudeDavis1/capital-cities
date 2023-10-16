import React from "react";
import axios from "axios";

import { lambdaBase } from "@capital-cities/common/config";
import { PlayHeader } from "./components/play-header";
import { MainCard } from "./components/play-main-card";

import { CountryInfo } from "@capital-cities/common/types";
import { MainQuestionPage } from "./components/main-question-page";

export default function Page() {
  return <MainQuestionPage />;
}
