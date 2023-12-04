import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from "./home";
export default function App() {

  return (
  <Home/>
  );
}
