import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import { theme } from "./styles/theme";

import MainPage from "./page/MainPage";
import PostPage from "./page/PostPage";
import PartyPage from "./page/PartyPage";
import AuthorPage from "./page/AuthorPage";
import ProfilePage from "./page/ProfilePage";
import PostWritePage from "./page/PostWritePage";
import PostViewpage from "./page/PostViewPage";
import ProfileWritePage from "./page/ProfileWritePage";
import SignUpPage from "./page/SignUpPage";
import SignUpViewPage from "./page/SignUpViewPage";

import AppPreview from "./AppPreview";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router basename={import.meta.env.BASE_URL}>
        <AppPreview>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/post/write" element={<PostWritePage />} />
            <Route path="/post/write/:id" element={<PostWritePage />} />
            <Route path="/post/:id" element={<PostViewpage />} />
            <Route path="/party" element={<PartyPage />} />
            <Route path="/author/:id" element={<AuthorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/write" element={<ProfileWritePage />} />
            <Route path="/post/:id/signup" element={<SignUpPage />} />
            <Route path="/signup/view/:id" element={<SignUpViewPage />} />
          </Routes>
        </AppPreview>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
