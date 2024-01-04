import React from "react";
import AdminLayout from "../../Hoc/adminLayout";

const Dashboard = (props) => {
    return(
        <AdminLayout title="Painel">
            <div className="user_dashboard">
                <div>
                    Esse é o seu painel
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard;