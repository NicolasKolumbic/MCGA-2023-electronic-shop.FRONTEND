import { FormControl } from "./models/form-control"

export interface Form {
    formName: string
    control: (controlName: string) => FormControl | undefined
    validateAll: () => Form
    patchValue: (data: any) => void
    isInvalid: boolean
}