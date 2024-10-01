import { getComments } from "../actions";
import AppComponent from "./page.client";

const AppContainer = async () => {
  const res = await getComments();

  return <AppComponent comments={res} />;
};

export default AppContainer;
