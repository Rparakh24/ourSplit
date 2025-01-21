import { useState } from "react"

export default function Inputbox({label,placeholder,onChange}){
    const[text,setText] = useState("");
    return<>
        <div className="mt-5">
            <div className="font-sm font-normal py-2">{label}</div>
            <input onChange={onChange} type="text"  className="w-80 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} required />
        </div>
    </>
}