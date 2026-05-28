import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NewsList from './pages/NewsList'
import NewsArticle from './pages/NewsArticle'
import ConditionsList from './pages/ConditionsList'
import ConditionHub from './pages/ConditionHub'
import PhysicianInsightsList from './pages/PhysicianInsightsList'
import PhysicianInsightsArticle from './pages/PhysicianInsightsArticle'
import CoursesList from './pages/CoursesList'
import CourseDetail from './pages/CourseDetail'
import Newsletter from './pages/Newsletter'
import Subscribe from './pages/Subscribe'
import AccountPage from './pages/AccountPage'
import WelcomePage from './pages/WelcomePage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/conditions" element={<ConditionsList />} />
        <Route path="/conditions/:slug" element={<ConditionHub />} />
        <Route path="/physician-insights" element={<PhysicianInsightsList />} />
        <Route path="/physician-insights/:slug" element={<PhysicianInsightsArticle />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
