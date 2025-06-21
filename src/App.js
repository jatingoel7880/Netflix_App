import { useEffect, useState } from "react";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import LoaderNetflix from "./components/loader/LoaderNetflix";

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
       {loading ? <LoaderNetflix/>: <Body />}
       {/* <Body/> */}
    </Provider>
  );
}

export default App;
