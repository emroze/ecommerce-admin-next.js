'use client'
import Spinner from "@/components/spinner";
import { prettyDate } from "@/lib/date";
import axios from "axios";
import { useEffect, useState } from "react"
import { withSwal } from "react-sweetalert2";


function AdminsPage({swal}){
    const [email,setEmail] = useState('');
    const [adminEmails, setAdminEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function addAdmin(ev){
        ev.preventDefault();
        axios.post('/api/admins',{email}).then(res => {
            swal.fire({
                title: 'Admin created!',
                icon: 'success',
            })
            setEmail('');
            loadAdmins();
        }).catch(err => {
            swal.fire({
                title: 'Error!',
                text: err?.response?.data?.message,
                icon: 'error',
            })
        })
    }

    function loadAdmins(){
        setIsLoading(true);
        axios.get('/api/admins').then(res=>{
            setIsLoading(false);
            setAdminEmails(res.data);
        })
    }

    function deleteAdmin(_id,email){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${email}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed){
                axios.delete('/api/admins?_id='+_id).then(() => {
                    swal.fire({
                        title: 'Admin Deleted!',
                        icon: 'success',
                    })
                    loadAdmins();
                })
            }
        })
        
    }

    useEffect(() => {
        loadAdmins()
    },[])

    return (
        <>
            <h1>Admins</h1>
            <h2>Add new admin</h2>
            <form onSubmit={addAdmin}>
                <div className="flex gap-2 items-center justify-center">
                    <input 
                        type="text"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} 
                        className="m-0 py-1 border-collapse" 
                        placeholder="Enter Google Account"
                    />
                    <button 
                        type="submit"
                        className="btn-primary py-1 whitespace-nowrap">
                        Save
                    </button>
                </div>
            </form>

            <h2>Existing Admin</h2>
            <table className="basic">
                <thead>
                    <tr>
                        <th>
                            Admin Google Email
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td><Spinner fullwidth={1}/></td>
                            <td></td>
                        </tr>
                    )}
                    {adminEmails.length>0 && adminEmails.map(adminEmail => (
                        <tr key={adminEmail._id}>
                            <td>
                                {adminEmail.email}
                            </td>
                            <td><time>{prettyDate(adminEmail?.createdAt,adminEmail?.email)}</time></td>
                            <td>
                                <button onClick={() => deleteAdmin(adminEmail._id,adminEmail.email)} className="btn-red">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default withSwal(({swal},ref) => (
    <AdminsPage swal={swal}/>
))