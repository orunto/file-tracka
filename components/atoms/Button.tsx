// import styles from 
interface Props {
    href: any,
    children: any
}

export default function Button (props: Props) {
    return(
        <a href={props.href} className="">
            <button>
                {props.children}
            </button>
        </a>
    )
}