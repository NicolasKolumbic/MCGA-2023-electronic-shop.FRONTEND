export interface Validation {
    name: string;
    errorMessage: string;
    isInvalid: boolean;
    action: (value: string | number | null | undefined) => boolean
}