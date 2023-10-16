"use client";

import { Button } from "@/components/ui/button";
import { Question, SelectedOption } from "@capital-cities/common/types";
import { MoveRight } from "lucide-react";
import { SetReloadFn } from "./types";
import React from "react";
import { checkOption } from "@/app/services/check-option";
import { toast } from "@/components/ui/use-toast";

interface MainCardProps {
  question: Question;
  setReload: SetReloadFn;
}

export function MainCard({ question, setReload }: MainCardProps) {
  return (
    <div className="bg-main-card-background space-y-10 p-4 rounded md:w-2/3 w-full mx-auto mt-10">
      <h1 className="bg-orange-400 p-4 text-center sm:w-1/3 w-2/3  mx-auto rounded">
        What&apos;s the capital of: <strong>{question.name}</strong>?
      </h1>

      <h3 className="bg-red-400 p-4 text-center sm:w-1/3 w-2/3 mx-auto rounded">
        Flag
      </h3>

      <div className="flex sm:space-x-10 space-x-2 justify-center">
        {question.options.map((capitalOption, i) => (
          <Button
            className="bg-green-500 px-4 py-10 text-foreground text-xs rounded w-1/3 text-center hover:bg-green-600"
            key={i}
            onClick={(event) =>
              checkOption({
                country: question.name,
                selectedCapital: capitalOption,
              }).then((res) => {
                res.correct
                  ? toast({
                      title: "Correct!",
                      description: "Well done!",
                      variant: "success",
                    })
                  : toast({
                      title: "Wrong!",
                      description: `The correct answer is ${res.actual}`,
                      variant: "destructive",
                    });
              })
            }
          >
            {capitalOption ? capitalOption : "No Capital"}
          </Button>
        ))}
      </div>

      <Button
        variant="destructive"
        className="flex justify-end ml-auto gap-2"
        onClick={() => setReload(true)}
      >
        Next <MoveRight />
      </Button>
    </div>
  );
}
