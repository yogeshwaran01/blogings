const Footer = () => {
    return (
        <footer className="text-gray-400 bg-blue-900 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-white" href="/">
                    <span className="ml-3 text-xl">Blogings</span>
                </a>
                <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2021 Blogings —
                    <a href="https://twitter.com/yogeshwaran01" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@yogeshwaran01</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer
