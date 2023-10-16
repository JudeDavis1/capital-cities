import { lambdaBase, lambdaRoutes } from "@capital-cities/common/config";
import axios from "axios";

export async function getFlagUrl(countryName: string) {
  const res = await axios.post(lambdaRoutes.getFlag, { countryName });
  return res.data.flag;
}
