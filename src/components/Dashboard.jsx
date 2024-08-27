import React, { useState } from "react";
import Sidebar from "./SideBar";
import TransactionTable from "./TransactionTable";
import TopBar from "./Topbar";

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  return (
    <Sidebar>
      <TopBar setSearchText={setSearchText} searchText={searchText} />
      <br />
      <TransactionTable searchText={searchText} />
    </Sidebar>
  );
}

export default Dashboard;
