const GradientText = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-accent animate-gradient-x">
            {children}
        </span>
    )
}
export default GradientText;