import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const AdminPage = (): ReactElement => {
    const session = getServerSession()
    if(!session){
        return redirect('/')
    }
    return <div>Admin</div>
}

export default AdminPage