import { previousFilesIdPath } from "../../constants.js";
import { appendFile } from "../dataUtils/dataUtils.js";
import {
    readFilesId,
    readFilesIdType
} from "./readFilesId.js";

export function setPreviousIdentifiers() {
    const currentFSState = readFilesId(readFilesIdType.current);
    appendFile(previousFilesIdPath, currentFSState.toString());
}