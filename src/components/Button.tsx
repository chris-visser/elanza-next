import classnames from 'classnames'

const variantClassMap = {
    primary: 'bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-400',
    outline: ''
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
    children?: React.ReactNode
    variant?: 'primary' | 'outline'
    type?: 'button' | 'submit'
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', type, ...btnProps }) => (
    <button type={type} className={classnames('rounded-lg px-4 py-2', variantClassMap[variant])} {...btnProps}>
        {children}
    </button>
)