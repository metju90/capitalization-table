import { getShareholdersDefaultData } from "./utils";
import { cloneDeep } from "lodash";

export const DEFAULT_SHAREHOLDERS_DATA = cloneDeep(
  getShareholdersDefaultData()
);

export const DEFAULT_EXIT_VALUE =
  new URL(window.location.href).searchParams.get("exit") || 25.0e6;

export const INITIAL_STATE = {
  exitValue: DEFAULT_EXIT_VALUE,
  cappedInvestors: [],
  commonStockSum: 0,
  shareholders: DEFAULT_SHAREHOLDERS_DATA
};

export const EXIT_VALUE = "EXIT_VALUE";
export const PREFERRED_STOCK = "PREFERRED_STOCK";
export const CHANGE_CAP = "CHANGE_CAP";
export const CHANGE_MULTIPLIER = "CHANGE_MULTIPLIER";
export const ADDITION = "ADDITION";
export const SUBTRACT = "SUBTRACT";
