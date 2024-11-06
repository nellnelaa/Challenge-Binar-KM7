import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import NavigationBar from "../components/Navbar";import SideNavigationBar from "../components/SideNav";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Navbar */}
      <NavigationBar />

      {/* Sidebar and Content Wrapper */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <SideNavigationBar />

        {/* Main Content */}
        <Container fluid style={{ flex: 1 }}>
          <Outlet />
        </Container>
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});