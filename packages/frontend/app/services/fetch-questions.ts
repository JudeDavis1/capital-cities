import { toast } from "@/components/ui/use-toast";
import { lambdaRoutes } from "@capital-cities/common/config";
import { GetQuestionResult } from "@capital-cities/common/types";
import axios from "axios";

export async function fetchQuestions(): Promise<GetQuestionResult> {
  try {
    const response = await axios.get(lambdaRoutes.getQuestion);

    return response.data as GetQuestionResult;
  } catch (error) {
    toast({
      title: "Error",
      description: "Error, please try again.",
      variant: "destructive",
    });
    throw error;
  }
}
