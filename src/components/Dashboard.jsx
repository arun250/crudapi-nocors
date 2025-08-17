import React from 'react'
import Header from "./Header"
import LeftSidebar from "./LeftSidebar"
import Footer from './Footer'

function Dashboard() {
  return (
    <>
      <div className='wrapper'>
      <Header />
        
  <div className="content-page">
  <div className="content">
    {/* Start Content*/}
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12">
          <h5 className="page-title mt-3">Dashboard</h5>
      
        </div>
      </div>
      <div className="row">
        {/* Total Users */}
        <div className="col-sm-6 col-xl-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <div className="icon-square bg-primary text-white">
                <i className="mdi mdi-account-check-outline font-24" />
              </div>
              <div>
                <h5 className="card-title">Total Users</h5>
                <p className="card-text" runat="server" id="totalUsers">
                  50
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Active Users */}
        <div className="col-sm-6 col-xl-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <div className="icon-square bg-primary text-white">
                <i className="mdi mdi-account-star-outline font-24" />
              </div>
              <div>
                <h5 className="card-title">Active Users</h5>
                <p className="card-text" runat="server" id="activeUsers">
                  1000
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Inactive Users */}
        <div className="col-sm-6 col-xl-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <div className="icon-square bg-primary text-white">
                <i className="mdi mdi-account-off-outline font-24" />
              </div>
              <div>
                <h5 className="card-title">Inactive Users</h5>
                <p className="card-text" runat="server" id="inactiveUsers">
                  150
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* end row */}
  </div>
  {/* container */}
      </div>
     
<Footer/>
      </div>
      </>
  )
}

export default Dashboard