
const Spinner = ({ className = '' }) => {
    return (
        <div className={className}>
            <div className="spinner flex gap-x-2">
                <div className="w-3.5 h-3.5 bg-teal-600 rounded-full"></div>
                <div className="w-3.5 h-3.5 bg-teal-600 rounded-full"></div>
                <div className="w-3.5 h-3.5 bg-teal-600 rounded-full"></div>
            </div>
        </div>
    )
}
export default Spinner