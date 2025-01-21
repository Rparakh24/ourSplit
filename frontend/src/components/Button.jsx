export default function Button({className,text,onClick}){
    return<>
        <button onClick={onClick} className={className}>{text}</button>
    </>
}