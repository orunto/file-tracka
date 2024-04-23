// import styles from 
interface Props {
    children: any,
    onclick: any
}

export default function Button(props: Props) {
    return (
        <button onClick={props.onclick} className="border-none font-medium rounded-lg flex gap-2 items-center justify-center px-8 py-4 bg-green-500 text-gray-50 text-xl">
            {props.children}
        </button>
    )
}