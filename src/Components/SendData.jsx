import SendDataModal from "./UI/SendDataModal";
import { useState } from "react";
import useRequest from "./Hooks/useRequest";
const SendData = ({ openBackDrop, onClose, onCreateData }) => {
  let enteredData;
  const dataHandler = (data) => {
    const key = data.name;
    const createdData = {
      id: key,
      name: enteredData.name,
      distance: enteredData.distance,
      time: enteredData.time,
    };
    onCreateData(createdData);
  };
  const [error, isLoading, request] = useRequest(dataHandler);
  const addDataHandler = (data) => {
    enteredData = data;
    request({
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <section>
      <SendDataModal
        onAddData={addDataHandler}
        openBackDrop={openBackDrop}
        onClose={onClose}
        error={error}
        loading={isLoading}
      />
    </section>
  );
};
export default SendData;
