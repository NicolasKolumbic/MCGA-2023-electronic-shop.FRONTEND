import { DropdownItem } from "@/models/dropdown-item";

export interface Props {
    items: DropdownItem[];
    value?: string;
    id: string;
    change?: (value: string) => void
}