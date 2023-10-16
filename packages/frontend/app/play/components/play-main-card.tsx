"use client";

import { Question } from "@capital-cities/common/types";

export function MainCard() {
  return (
    <div className="bg-main-card-background space-y-6 p-4 rounded w-2/3 mx-auto mt-10">
      <h1 className="bg-orange-400 p-4 text-center sm:w-1/3 w-2/3  mx-auto rounded">
        Question
      </h1>

      <h3 className="bg-red-400 p-4 text-center sm:w-1/3 w-2/3 mx-auto rounded">
        Flag
      </h3>
    </div>
  );
}
