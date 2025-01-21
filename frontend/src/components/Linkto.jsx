import {Link} from 'react-router-dom';

export default function Linkto({text,to}){
    return<div>
    <Link to={to} className="font-medium  underline">{text}</Link> 
    </div>
}