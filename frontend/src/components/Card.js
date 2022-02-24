const Card = ({ date, title, slug, userName, isAuth, id }) => {
    return (
        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-black">{userName}</span>
                <span className="mt-1 text-black-500 text-sm">{ date }</span>
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-black-600 title-font mb-2">{title}</h2>
                <a className="text-blue-900 inline-flex items-center mt-4" href={`/blog/${slug}`}>open
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </a>
                {isAuth ? <a className="text-blue-900 inline-flex items-center mt-4" href={`/edit/${id}`}>edit
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </a> : <></>}
            </div>
        </div>
    )
}

Card.defaultProps = {
    isAuth: false
}

export default Card
