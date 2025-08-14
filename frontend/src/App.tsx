import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import routerBindings, { DocumentTitleHandler, NavigateToResource } from "@refinedev/react-router-v6";
import PocketBase from "pocketbase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { type AuthOptions, authProvider, dataProvider, liveProvider } from "refine-pocketbase";
import { CustomPage } from "./pages/CustomPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UpdatePasswordPage } from "./pages/UpdatePasswordPage";
import { POCKETBASE_URL } from "./utils/config";
import { AntdInferencer } from "@refinedev/inferencer/antd";

const pb = new PocketBase(POCKETBASE_URL);

const authOptions: AuthOptions = {
  registerRedirectTo: "/users",
  loginRedirectTo: "/users",
  updatePasswordRedirectTo: "/login"
}

const providers = {
  dataProvider: dataProvider(pb),
  liveProvider: liveProvider(pb),
  authProvider: authProvider(pb, authOptions),
}

export const App = () =>
  <BrowserRouter>
    <Refine
      {...providers}
      routerProvider={routerBindings}
      resources={[
        {
          name: "users",
          list: "/users",
          create: "/users/create",
          edit: "/users/edit/:id",
          show: "/users/show/:id",
          meta: {
            canDelete: true,
          },
        },
        {
          name: "custom",
          list: "/custom",
        },
      ]}
      options={{
        liveMode: "auto",
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: "K2WTtI-rl83Fw-Fn1FJF",
      }}
    >
      <Routes>
        <Route element={
          <Authenticated
            key="authenticated-inner"
            redirectOnFail="/login"
          >
            <Outlet />
          </Authenticated>
        }>
          <Route
            index
            element={<NavigateToResource resource="users" />}
          />
          <Route index path="/custom" element={<CustomPage />} />
          <Route path="/users" element={<AntdInferencer />} />
          {/* <Route path="/users">
            <Route index element={<HeadlessListInferencer resource="users" />} />
            <Route path="create" element={<HeadlessCreateInferencer resource="users" />} />
            <Route path="edit/:id" element={<HeadlessEditInferencer resource="users" />} />
            <Route path="show/:id" element={<HeadlessShowInferencer resource="users" />} />
          </Route> */}
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
      <DocumentTitleHandler />
    </Refine>
  </BrowserRouter>
