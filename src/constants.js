import { getShareholdersDefaultData } from "./utils";
import { cloneDeep } from "lodash";

export const defaultShareHoldersData = cloneDeep(getShareholdersDefaultData());
export const defaultExitValue =
  new URL(window.location.href).searchParams.get("exit") || 25.0e6;

export const initialState = {
  exitValue: defaultExitValue,
  cappedInvestors: [],
  commonStockSum: 0,
  shareholders: defaultShareHoldersData
};
