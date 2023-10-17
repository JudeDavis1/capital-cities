"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@capital-cities/common/types";
import { Loader2, MoveRight } from "lucide-react";
import { SetReloadFn } from "./types";
import React from "react";
import { checkOption } from "@/app/services/check-option";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { getFlagUrl } from "@/app/services/get-flag-url";

interface MainCardProps {
  question: Question;
  setReload: SetReloadFn;
}

export function MainCard({ question, setReload }: MainCardProps) {
  const [imgError, setImgError] = React.useState(false);
  const [flagUrl, setFlagUrl] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getFlagUrl(question.name).then((flag) => {
      setFlagUrl(flag);
      setLoading(false);
    });
  }, [question]);

  return (
    <div className="bg-main-card-background space-y-10 p-4 rounded md:w-2/3 w-full mx-auto mt-10">
      <h1 className="bg-orange-400 p-4 text-center sm:w-1/3 w-2/3  mx-auto rounded">
        What&apos;s the capital of: <strong>{question.name}</strong>?
      </h1>

      <h3 className="bg-slate-700 p-4 text-center sm:w-1/3 w-2/3 mx-auto rounded">
        {!loading ? (
          flagUrl && !imgError ? (
            <Image
              className="flex justify-center mx-auto shadow-lg shadow-black"
              width={300}
              height={200}
              src={flagUrl}
              alt=""
              onError={(e) => setImgError(true)}
            />
          ) : (
            <i>No flag</i>
          )
        ) : (
          <Loader2 className="flex justify-center ml-auto animate-spin" />
        )}
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
                      description: `The correct answer is ${
                        res.actual ? res.actual : "No Capital"
                      }`,
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
