export interface Props {
    type?: 'button' | 'submit' | 'reset';
    label: string | React.ReactNode;
    design: string;
    link?: string
    click?: (event: React.MouseEvent) => void
}