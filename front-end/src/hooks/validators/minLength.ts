import { Validation } from "../abstractions/validation.interface";

export function minLength(limit: number): (controlName: string) => Validation {

    return function (controlName: string) {

        return {
            name: 'minLength',
            isInvalid: false,
            errorMessage: `El campo "${controlName}" debe contener al menos ${limit}.`,
            action: (value: string | number | null | undefined) => {
                return value !== '' && value !== null && value !== undefined && (value as string).length < limit;
            }
        }
        
    }
}