export interface Props {
    id: string;
    name: string;
    checked?: boolean;
    text: string;
    change?: (value: string) => void
}