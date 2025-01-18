import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useState } from "react";
import { ProfilePage } from "./components/pages/profile/profilePage";

import "./App.css";
import { PageLayout } from "./components/layouts/pageLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <PageLayout>
        <ProfilePage />
      </PageLayout>
    </div>
  );
}

export default App;
