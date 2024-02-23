import { Control } from "./abstractions/control.interface";
import { FormSetting } from "./abstractions/form-setting.interface";
import { Form } from "./form.interface";
import { FormControl } from "./models/form-control";
import { FormGroup } from "./models/form-group";

export function useForm(form: FormSetting): Form {
    return new FormGroup(
        form.name,
        form.controls.map((control: Control) => new FormControl(control))
    )
}