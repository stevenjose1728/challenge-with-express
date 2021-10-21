import React from 'react'
export type CustomProps = {
    color?: string | undefined;
    value?: Date | undefined;
    hasError?: boolean | undefined,
    ref: React.RefObject<HTMLDivElement>;
    className?: string;
    text?: string | undefined;
    placeholder?: string,
    onClick?: () => void;
}