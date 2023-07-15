import { ClipLoader, RotateLoader } from "react-spinners";

export default function Spinner({fullwidth}){
    if(fullwidth==1){
        return(
            <div className="w-full flex justify-center">
                <ClipLoader color={'#475569'} speedMultiplier={2} />
            </div>
        )
    }
    return (
        <ClipLoader color={'#475569'} speedMultiplier={2} />
    )
}