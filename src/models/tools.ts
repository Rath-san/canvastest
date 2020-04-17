import { TOOLS } from "./enums"

export type ToolNumeric = 0 | 1 | 2;
export type Tool = keyof typeof TOOLS;
export type Tools = {
    [P in Tool]: number
}
