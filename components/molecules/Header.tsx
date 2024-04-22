'use client'

interface props {
    username: any,
    user_role: any,
    page: any
}
export default function Header(props: props) {
    return (
        <nav className="box-border flex justify-between items-center m-0 px-12 py-6">
            <a href="#" className="m-0 text-black text-4xl font-bold">{props.page}</a>

            <div className="flex px-8 py-1 border-2 border-gray-900 gap-6 rounded-lg">
                <article className="flex gap-2 items-center">
                    <header className="flex items-center text-2xl font-semibold bg-green-500 text-gray-50 px-6 h-full rounded-lg">O</header>

                    <p className="flex flex-col">
                        <b className="text-base">{props.username}</b>
                        <span className="text-sm">{props.user_role}</span>
                    </p>

                </article>

                <a href="" className="text-red-600">Logout</a>
            </div>
        </nav>
    )
}