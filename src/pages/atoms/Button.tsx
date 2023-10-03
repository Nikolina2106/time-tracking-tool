import styled, {css} from 'styled-components';
import {Button} from 'primereact/button';

const styles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 2.25rem;
    flex-shrink: 0;
`;

const StyledLinkButton = styled(Button)`
    color: var(--Orange, #ff5722);
    font-family: Nunito Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.0625rem; /* 121.429% */
    text-decoration-line: underline;
`;

const StyledIconButton = styled(Button)`
    ${styles};
    background-color: transparent;
    border: none;
    color: #5f6b8a;
`;

const StyledPrimaryIconButton = styled(Button)`
    ${styles};
    background-color: transparent;
    border: none;
    color: var(--Orange, #ff5722);
`;

const StyledPrimaryButton = styled(Button)`
    ${styles};
    background-color: var(--Orange, #ff5722);
    border-radius: 0.1875rem;
    border: 1px solid var(--Orange, #ff5722);
    color: white;
    padding: 0 1rem;
    gap: 0.5rem;
`;

const StyledTransparentButton = styled(Button)`
    ${styles};
    background-color: white;
    border-radius: 0.1875rem;
    border: 1px solid var(--Orange, #ff5722);
    color: var(--Orange, #ff5722);
    padding: 0 1rem;
`;

const StyledSecondaryButton = styled(Button)`
    ${styles};
    background-color: #181846;
    border-radius: 0.1875rem;
    border: 1px solid #181846;
    color: white;
    padding: 0 1rem;
    gap: 0.5rem;
`;

interface ButtonProps {
    label?: string;
    link?: boolean;
    primary?: boolean;
    secondary?: boolean;
    transparent?: boolean;
    iconButton?: boolean;
    fullWidth?: boolean;
    icon?: string;
    onClick?: (e: React.FormEvent) => void;
}
export default function ButtonComponent(props: ButtonProps): JSX.Element {
    const {onClick, label, link, fullWidth, primary, secondary, transparent, iconButton, icon} = props;

    if (link) {
        return <StyledLinkButton onClick={onClick} link label={label} />;
    }
    if (iconButton) {
        if (primary) return <StyledPrimaryIconButton icon={icon} onClick={onClick} />;
        return <StyledIconButton icon={icon} onClick={onClick} />;
    }
    if (secondary) {
        return <StyledSecondaryButton icon={icon} label={label} onClick={onClick} style={{width: `${fullWidth ? '100%' : ''}`}} />;
    }
    if (transparent) {
        return <StyledTransparentButton icon={icon} label={label} onClick={onClick} style={{width: `${fullWidth ? '100%' : ''}`}} />;
    }

    return <StyledPrimaryButton icon={icon} label={label} onClick={onClick} style={{width: `${fullWidth ? '100%' : ''}`}} />;
}
