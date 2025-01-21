export default function Input({onChange}){
    return(
        <div className="w-11/12 mt-8">
                <input onChange={onChange} className=" w-full border rounded-lg p-2" placeholder="Search Users..."></input>
        </div>
    )
}