import { FormControl } from "./form-control";

export class FormGroup {

    formName: string;
    controls: FormControl[] = [];
    isInvalid = false;

    constructor(
        formName: string,
        controls: FormControl[]
    ) {
        this.formName = formName;
        this.controls = controls;
    }

    control(controlName: string) : FormControl | undefined{
        return this.controls.find((control: FormControl) => control.name ===  controlName)
    }

    validateAll(): FormGroup {
        this.controls = this.controls.map((formControl: FormControl) => {
            formControl.validate();
            return formControl
        });

        return new FormGroup(this.formName, this.controls);
    }

    patchValue(data: any) {
        Object.keys(data).forEach((key: string) => {
            const ctrol = this.controls.find((control: FormControl) =>control.name === key);

            if(ctrol) {
                ctrol.currentValue = data[key];
            }
        })
    }
}