import { Routes, Route, Navigate } from 'react-router-dom';
import Alertdashboard from '../pages/Alertdashboard';
import Product from '../pages/Product';
// import NotAccessible from "../pages/NotAccessible.jsx"


export default function AppRoutes() {

  return (
      <Routes>
        {/* <Route path="/products" element={
          <PublicRoute>
            <Signin />
          </PublicRoute>
        } /> */}

        <Route path="/inventory-alert" element={ <Alertdashboard /> } />
         <Route path="/product" element={ <Product /> } />

{/*
        <Route path="/not-accessible" element={
          <PrivateRoute>
            <NotAccessible />
          </PrivateRoute>
        } /> */}
      </Routes>
  );
}