import React from "react";
import PageHeader from "../../components/common/PageHeader";
import ActionTable from "../../components/common/ActionTable";

function Schema() {
  const columns = [
    "Schemes Number",
    "Schemes Name",
    "Schemes Start Date",
    "Status",
  ];
  const data = [
    {
      "Schemes Number": "S001",
      "Schemes Name": "Scheme 1",
      "Schemes Start Date": "2025.06.07",
      Status: "Active",
    },
    {
      "Schemes Number": "S002",
      "Schemes Name": "Scheme 2",
      "Schemes Start Date": "2025.06.07",
      Status: "Active",
    },
  ];

  const handleUpdate = async (id) => {
    console.log("Update row with id:", id);
  };
  return (
    <div className="block">
      <PageHeader title={"Schemes"} />

      {/* calculation data table */}
      <ActionTable
        columns={columns}
        data={data}
        handleUpdate={handleUpdate}
        title="Scheme Report"
      />
    </div>
  );
}

export default Schema;
