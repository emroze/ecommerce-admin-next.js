import Link from "next/link";

export default function products(){
    return (
        <div>
            <Link className="bg-slate-800 text-white py-1 px-2 rounded-md" href="/products/new">Add new products</Link>
        </div>
    )
}