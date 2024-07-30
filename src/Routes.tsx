import { lazy } from "react";
import {
    BrowserRouter,
    Route,
    Routes as Switch
  } from "react-router-dom";
import { CompanyProvider } from "./features/shared/components/CompanyContext";

  const Home = lazy(
    () => import('./features/home/components/Home'));
  const TreeViewScreen = lazy(
    () => import('./features/treeView/components/TreeViewScreen'));

  const App: React.FC = () => {
  
    return (
      <main>
        <Home>
            <Switch>
                <Route path="/" element={<TreeViewScreen />} />
            </Switch>
          </Home>
      </main>
    );
  };

  const Routes: React.FC = () => {
    return (
        <BrowserRouter>
          <CompanyProvider>
            <App />
          </CompanyProvider>
        </BrowserRouter>
    );
  };
  
  export default Routes;