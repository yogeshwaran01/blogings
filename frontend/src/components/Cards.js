import { convertDate } from "../util"
import Card from "./Card"

const Cards = ({blogs, isAuth}) => {
    return (<section className="text-black bg-gradient-to-br from-green-500 to-yellow-600 body-font overflow-hidden border-2 border-black">
        <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-800">
            {blogs.map(b => <Card key={b.id} date={convertDate(b.timestamp)} slug={b.id} title={b.title} userName={b.userName} isAuth={isAuth} id={b.id} />)}
            </div>
        </div>
    </section>)
}

Cards.defaultProps = {
    isAuth: false
}

export default Cards
