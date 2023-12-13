export interface Props {
    type: 'button' | 'submit' | 'reset';
    label: string | React.ReactNode;
    design: string;
    click?: (event: React.MouseEvent) => void
}