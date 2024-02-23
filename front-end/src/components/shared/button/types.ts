export interface Props {
    type?: 'button' | 'submit' | 'reset';
    label: string | React.ReactNode;
    design: string;
    link?: string
    icon?: React.JSX.Element
    click?: (event: React.MouseEvent) => void
}