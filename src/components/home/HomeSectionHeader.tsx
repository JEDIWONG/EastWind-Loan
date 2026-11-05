interface HomeSectionHeader{
    title : string,
    desc : string
}

const HomeSectionHeader = ({title,desc}:HomeSectionHeader)=>{

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    {title}
                </h1>

                <p className="mx-auto mt-2 max-w-2xl text-gray-500">
                    {desc}
                </p>
            </div>
        </>
    )
}

export default HomeSectionHeader;