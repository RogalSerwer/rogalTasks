const IconButton = ({children, className, ...props}) => {
    return <button {...props} className={`!m-[0] !p-[0] !bg-transparent !border-none ${className ?? ""}`}>{children}</button>
} 

export default IconButton