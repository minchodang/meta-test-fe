import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type InputStyle = 'primary' | 'secondary';

interface CommonInputProps extends InputProps {
    placeholder?: string;
    variant?: InputStyle;
}

const CommonInput = forwardRef<HTMLInputElement, CommonInputProps>(
    ({ placeholder = 'primary', variant, ...props }, ref) => {
        let variantClasses = '';
        switch (variant) {
            case 'primary':
                variantClasses =
                    'block w-full h-10 disabled:opacity-25 rounded-lg border border-violet-400 bg-violet-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-violet-400 dark:bg-violet-100 dark:text-black dark:placeholder-violet-400 dark:focus:border-blue-500 dark:focus:ring-blue-500';
                break;
            case 'secondary':
                variantClasses =
                    'block w-full h-10 disabled:opacity-25 rounded-lg border-none focus:border-blue-500 focus:ring-blue-500  p-2.5';
                break;
            default:
                break;
        }

        return (
            <input {...props} className={`${variantClasses}`} placeholder={placeholder} ref={ref} />
        );
    },
);

CommonInput.displayName = 'CommonInput';

export default CommonInput;
