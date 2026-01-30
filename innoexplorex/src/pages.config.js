import Landing from './pages/Landing';
import Auth from './pages/auth';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import PlanTrip from './pages/PlanTrip';
import Gallery from './pages/Gallery';


export const PAGES = {
    "Landing": Landing,
    "Auth": Auth,
    "Dashboard": Dashboard,
    "Explore": Explore,
    "PlanTrip": PlanTrip,
    "Gallery": Gallery,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
};