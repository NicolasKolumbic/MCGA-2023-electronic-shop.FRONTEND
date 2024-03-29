import { FormControl } from "@/hooks/models/form-control";

export interface Props {
    type: string;
    value?: any;
    id: string;
    label?: string;
    design: string;
    control?: FormControl
    change?: (value: any) => void
}