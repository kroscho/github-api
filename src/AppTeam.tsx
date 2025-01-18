import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { PageLayout } from "./components/layouts/pageLayout";
import { TeamPage } from "./components/pages/team/teamPage";

function AppTeam() {
  return (
    <div className="App">
      <PageLayout>
        <TeamPage />
      </PageLayout>
    </div>
  );
}

export default AppTeam;
