const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full bg-gradient-to-br from-green-500 to-yellow-600" role="status">
                <span className="visually-hidden" hidden>Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
