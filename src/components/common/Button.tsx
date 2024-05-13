import React from 'react';

type ButtonType = 'submit' | 'reset' | 'button';
type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type ButtonStyle = 'primary' | 'secondary' | 'primary-unselect' | 'blue';

interface IButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    classes?: React.ComponentProps<'button'>['className'];
    disabled?: boolean;
    children: string | React.ReactElement;
    variant: ButtonStyle;
}

const Button = ({
    type = 'button',
    size = 'base',
    classes,
    onClick,
    disabled = false,
    children,
    variant,
}: IButtonProps) => {
    let variantClasses = '';
    switch (variant) {
        case 'primary':
            variantClasses = 'bg-violet-300 hover:bg-violet-700 text-white disabled:bg-violet-300';
            break;
        case 'primary-unselect':
            variantClasses = 'bg-gray-100 hover:bg-gray-500  text-violet-300  disabled:bg-gray-100';
            break;
        case 'secondary':
            variantClasses = 'bg-gray-700 hover:bg-gray-500 text-white disabled:bg-gray-700';
            break;
        case 'blue':
            variantClasses = 'bg-blue-500 hover:bg-blue-300 text-white disabled:bg-blue-300';
            break;
        default:
            break;
    }

    return (
        <button
            type={type}
            className={`
            h-full
            w-full
            cursor-pointer
            rounded-md border-none px-4 py-2 disabled:cursor-not-allowed text-${size} ${variantClasses} ${classes}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
