export interface Props {
    type: string;
    value?: any;
    id: string;
    label?: string;
    design: string;
    change?: (value: any) => void
}