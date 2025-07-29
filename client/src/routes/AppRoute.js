import { Routes, Route, Navigate } from 'react-router-dom';
import Alertdashboard from '../pages/Alertdashboard';
import Product from '../pages/Product';


export default function AppRoutes() {

  return (
      <Routes>
        <Route path="/inventory-alert" element={ <Alertdashboard /> } />
        <Route path="/product" element={ <Product /> } />
      </Routes>
  );
}