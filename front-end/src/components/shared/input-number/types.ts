import { FormControl } from "@/hooks/models/form-control";

export interface Props {
    value?: any;
    id: string;
    label?: string;
    design: string;
    decimalPoint?: string;
    onlyIntegers?: boolean;
    control?: FormControl
    change?: (value: any) => void
}