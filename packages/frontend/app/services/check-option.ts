import { toast } from "@/components/ui/use-toast";
import { lambdaRoutes } from "@capital-cities/common/config";
import { SelectedOption } from "@capital-cities/common/types";
import axios from "axios";

export interface CheckOptionResponse {
  message: string;
  correct: boolean;
  actual: string;
}

export async function checkOption(
  selectedOption: SelectedOption
): Promise<CheckOptionResponse> {
  try {
    const response = await axios.post(lambdaRoutes.checkOption, selectedOption);
    const result = response.data as CheckOptionResponse;

    return result;
  } catch (error) {
    toast({
      title: "Error",
      description: "Could not submit answer.",
    });
    throw error;
  }
}
