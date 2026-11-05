

const SectionTitle = ({title,desc})=>{
    return(
        <>
            <div className="flex-cols gap-10 mb-10">
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
        </>
    )
}

export default SectionTitle;