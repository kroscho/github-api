import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ProfilePage } from "./components/pages/profile/profilePage";
import { PageLayout } from "./components/layouts/pageLayout";
import { TeamPage } from "./components/pages/team/teamPage";

function App() {
  return (
    <div className="App">
      <PageLayout>
        <ProfilePage />
        {/* <TeamPage /> */}
      </PageLayout>
    </div>
  );
}

export default App;
