import { Validation } from "../abstractions/validation.interface";

export function email(): (controlName: string) => Validation {

    return function (controlName: string): Validation {

        return {
            name: 'required',
            isInvalid: false,
            errorMessage: `El campo "${controlName}" es requerido.`,
            action: (value: string | number | null | undefined) => {
                return value === '' || value === null || value === undefined || value === 0;
            }
        }
        
    }
}