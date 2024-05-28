interface props {
    content: {
        message: any
    }[]
}

export default function Notifications(props: props) {
    if (props.content.length == 0) {
        return (
            <div className="flex flex-col p-8 absolute bg-white top-24 -left-16 shadow-md z-10">
                <p>No Notifications yet</p>

            </div>
        )

    }

    else {
        return (
            <div className="flex flex-col px-2 absolute gap-4 bg-white top-24 -left-16 shadow-md z-10">
                {
                    props.content.map((clone, i) => (
                        <p style={{ borderBottom: '2px solid #ABAAAA', padding: '16px',}} className=" px-8" key={i}>{clone.message}</p>
                    ))
                }

            </div>
        )

    }
}