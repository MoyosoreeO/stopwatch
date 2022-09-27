import "./App.css";
import Stopwatch from "./Components/Stopwatch";
import SendData from "./Components/SendData";
import useRequest from "./Components/Hooks/useRequest";
import { useState } from "react";
import HistoryList from "./Components/History/HistoryList";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

function App() {
  const [data, setData] = useState({});
  const [openForm, setOpeForm] = useState(false);
  const dataHandler = useCallback((data) => {
    const transformedData = [];
    for (let key in data) {
      transformedData.push({
        id: key,
        name: data[key].name,
        distance: data[key].distance,
        time: data[key].time,
      });
    }

    setData(transformedData);
  }, []);
  const configData = useMemo(() => {
    return {
      body: null,
      headers: { "Content-Type": "application/json" },
    };
  }, []);
  const [error, isLoading, request] = useRequest(dataHandler);
  useEffect(() => {
    request(configData);
  }, [request, configData]);
  const sendDatahandler = (value) => {
    setOpeForm(value);
  };
  const createdDataHandler = (createdData) => {
    setData((prev) => {
      return [createdData, ...prev];
    });
  };
  return (
    <>
      {openForm && (
        <SendData
          onCreateData={createdDataHandler}
          openBackDrop={openForm}
          onClose={setOpeForm}
        />
      )}
      <Stopwatch
        request={request}
        config={configData}
        onSend={sendDatahandler}
      />
      <HistoryList error={error} isLoading={isLoading} data={data} />
    </>
  );
}

export default App;
