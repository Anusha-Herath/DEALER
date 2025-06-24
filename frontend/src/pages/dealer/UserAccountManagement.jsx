import React from 'react'
import PageHeader from "../../components/common/PageHeader";
import { ToastContainer } from "react-toastify";
import ActionTable from '../../components/common/ActionTable';
import ModalPopup from "../../components/common/ModalPopup";
import sideImg from "../../assets/images/userSideImg.png";

const UserAccountManagement = () => {
  const columns = ["Service Number", "Name", "User Level", "Status"];
  const data = [
    { "Service Number": "001", Name: "Name 1", "User Level": "User Level 1", Status: "Active" },
    { "Service Number": "002", Name: "Name 2", "User Level": "User Level 2", Status: "Active" },
    { "Service Number": "003", Name: "Name 3", "User Level": "User Level 3", Status: "Active" }
  ];

  return (
    <div className="block p-4">
      <ToastContainer position="top-center" theme="colored" />

      {/* Topic */}
      <PageHeader title="User Account Management" />

      {/* Insert the table */}
      <ActionTable data={data} columns={columns} />

   

      <ModalPopup
        title="User Account Management"
        sideImg={sideImg}
        modalName="addUserAccountManagement"
      />
    </div>
  )
}

export default UserAccountManagement;