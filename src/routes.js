// Layout Types
import { DefaultPrivateLayout, DefaultPublic } from "./layouts";

// Route Public Views
import Home from './components/Pages/Home';
import FreeProperty from './components/Pages/FreeProperty';
import CheckOut from './components/Pages/CheckOut';
import Login from './components/Pages/Login';
import Property from './components/Pages/Property';
import HowItWorks from './components/Pages/HowItWorks';
import OurTeam from './components/Pages/OurTeam';
import Pricing from './components/Pages/Pricing';
import Support from './components/Pages/Support';
import News from './components/Pages/News';
import Videos from './components/Pages/Videos';
import FormDownloads from './components/Pages/FormDownloads';
import SignPetition from './components/Pages/SignPetition';

// Route Private Views
import UserProfileLite from "./views/UserProfileLite";
import ChangeAccountPassword from "./views/ChangeAccountPassword";
import AccountOrders from "./views/AccountOrders";
import AccountBillingDetails from "./views/AccountBillingDetails";
import DocumentUpload from "./views/DocumentUpload";
import AccountDocuments from "./views/AccountDocuments";
import InstructionalVideo from "./views/InstructionalVideo";
import PropertyRequestForm from "./views/PropertyRequestForm";
import Logout from "./components/Pages/Logout";

export default [
  {
    path: "/",
    layout: DefaultPublic,
    exact: true,
    component: Home
  },
  {
    path: "/propertyreport",
    layout: DefaultPublic,
    component: FreeProperty
  },
  {
    path: "/checkout",
    layout: DefaultPublic,
    component: CheckOut
  },
  {
    path: "/property",
    layout: DefaultPublic,
    component: Property
  },
  {
    path: "/how-it-works",
    layout: DefaultPublic,
    component: HowItWorks
  },
  {
    path: "/form-downloads",
    layout: DefaultPublic,
    component: FormDownloads
  },
  {
    path: "/our-team",
    layout: DefaultPublic,
    component: OurTeam
  },
  {
    path: "/sign-the-petition",
    layout: DefaultPublic,
    component: SignPetition
  },
  {
    path: "/pricing",
    layout: DefaultPublic,
    component: Pricing
  },
  {
    path: "/support",
    layout: DefaultPublic,
    component: Support
  },
  {
    path: "/news",
    layout: DefaultPublic,
    component: News
  },
  {
    path: "/videos",
    layout: DefaultPublic,
    component: Videos
  },
  {
    path: "/login",
    exact: true,
    layout: DefaultPublic,
    component: Login
  },
  {
    path: "/logout",
    exact: true,
    layout: DefaultPublic,
    component: Logout
  },
  {
    path: "/user-profile-lite",
    layout: DefaultPrivateLayout,
    component: UserProfileLite
  },
  {
    path: "/property-request-form",
    layout: DefaultPrivateLayout,
    component: PropertyRequestForm
  },
  {
    path: "/billing-details",
    layout: DefaultPrivateLayout,
    component: AccountBillingDetails
  },
  {
    path: "/change-password",
    layout: DefaultPrivateLayout,
    component: ChangeAccountPassword
  },
  {
    path: "/instructional-videos",
    layout: DefaultPrivateLayout,
    component: InstructionalVideo
  },
  {
    path: "/instructional-videos/:videoid",
    layout: DefaultPrivateLayout,
    component: InstructionalVideo
  },
  {
    path: "/my-orders",
    layout: DefaultPrivateLayout,
    component: AccountOrders
  },
  {
    path: "/upload-documents",
    layout: DefaultPrivateLayout,
    component: DocumentUpload
  },
  {
    path: "/view-documents",
    layout: DefaultPrivateLayout,
    component: AccountDocuments
  },
];
