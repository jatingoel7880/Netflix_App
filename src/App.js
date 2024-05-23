import { useEffect, useState } from "react";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Loader2 from "./components/loader/Loader2";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return (
    <Provider store={appStore}>
       {loading ? <Loader2/>: <Body />}
       {/* <Body/> */}
    </Provider>
  );
}

export default App;
