import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GalleryDetailPage from './pages/GalleryDetailPage'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery/:galleryId" element={<GalleryDetailPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
