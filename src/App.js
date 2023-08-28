import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import "./App.css";
import "./ui/styles.css";
import { ToasterProvider } from "./ui/ToasterContext";
import BookDetail from "./components/BookDetail";
import SignIn from "./components/SignIn";
import { Header } from "./ui";
import { StateProvider } from "./StateProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <StateProvider>
          <ToasterProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/" element={<BookList />} />
              <Route path="/book/:id/*" element={<BookDetail />} />
            </Routes>
          </ToasterProvider>
        </StateProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
