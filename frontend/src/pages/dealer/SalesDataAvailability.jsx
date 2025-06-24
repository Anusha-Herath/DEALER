import React from "react";
import PageHeader from "../../components/common/PageHeader";
import CalendarCard from "../../components/common/CalenderCard"; // ✅ this must match the file name exactly
import { CalendarData } from "../../data/dealer/CalendarData";

function SalesDataAvailability() {
  return (
    <>
      {/* add page header */}
      <PageHeader title={" Sales Data Availability"} />

      {/* add calendar cards to display data */}
      <CalendarCard data={CalendarData} />
    </>
  );
}

export default SalesDataAvailability;
