import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieForm from "../Movies/MovieForm";
import ActorForm from "../Actors/ActorForm";
import DirectorForm from "../Directors/DirectorForm";
import StudioForm from "../Studios/StudioForm";
// import './ServiceForms.css';

function ServiceForms() {
  return (
    <Routes>
      <Route path="/movies/add" element={<MovieForm />} />
      <Route path="/movies/add/:id" element={<MovieForm />} />

      <Route path="/actors/add" element={<ActorForm />} />
      <Route path="/actors/add/:id" element={<ActorForm />} />

      <Route path="/directors/add" element={<DirectorForm />} />
      <Route path="/directors/add/:id" element={<DirectorForm />} />

      <Route path="/studios/add" element={<StudioForm />} />
      <Route path="/studios/add/:id" element={<StudioForm />} />
    </Routes>
  );
}

export default ServiceForms;
