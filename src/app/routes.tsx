import { createBrowserRouter } from "react-router";
import { Welcome } from "./screens/Welcome";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { VideoTranslate } from "./screens/VideoTranslate";
import { TranslationResult } from "./screens/TranslationResult";
import { AccessibilityTools } from "./screens/AccessibilityTools";
import { LearningCenter } from "./screens/LearningCenter";
import { Profile } from "./screens/Profile";
import { SettingsPage } from "./screens/SettingsPage";
import { EditProfile } from "./screens/EditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/translate",
    Component: VideoTranslate,
  },
  {
    path: "/result/:id",
    Component: TranslationResult,
  },
  {
    path: "/tools",
    Component: AccessibilityTools,
  },
  {
    path: "/learn",
    Component: LearningCenter,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path:"/settings",
    Component: SettingsPage, 
  },
  {
    path :"/edit-profile",
    Component:EditProfile,
  },
]);
