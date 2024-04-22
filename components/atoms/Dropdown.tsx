'use client'
interface props {
    name: any,
    content: any[]
}

export default function Dropdown(props: props) {
    return (
        <select className="border-box flex gap-2 rounded-lg bg-transparent border border-gray-400 text-xl font-medium px-12 py-4" name={props.name} id={props.name}>
            <option className="text-xl font-medium" value="MDAS" disabled selected>{props.name}</option>
            {
                props.content.map((clone, i) => (
                    <option value={clone} key={i}>{clone}</option>
                ))
            }
        </select>
    )
}