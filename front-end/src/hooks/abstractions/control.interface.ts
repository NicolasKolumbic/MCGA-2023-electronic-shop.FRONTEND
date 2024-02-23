import { Validator } from "../types/validator.type";

export interface Control {
    name: string;
    validations: Validator[]
}