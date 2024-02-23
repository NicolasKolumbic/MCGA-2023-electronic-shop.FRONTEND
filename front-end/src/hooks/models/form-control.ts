import { Control } from "../abstractions/control.interface";
import { Validation } from "../abstractions/validation.interface";
import { Validator } from "../types/validator.type";

export class FormControl {

    name: string;
    validations: Validation[] = [];
    isInvalid = false;
    currentValue = '';

    constructor(control: Control) {
        this.name = control.name
        this.validations = control.validations.map((validator: Validator) => validator(this.name));
    }

    validate() {
        this.validations.forEach((validator: Validation) => {
            validator.isInvalid = validator.action(this.currentValue);
        });
        this.isInvalid =  this.validations.some((validator: Validation) => validator.isInvalid);
    }

    setValue(value: any) {
        this.currentValue = value;
        this.validate();
    }
}