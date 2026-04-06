import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [activityOpen, setActivityOpen] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()

  const chapters = [
    { id: 0, name: 'Home', icon: '🏠', label: '[HOME]', hash: '#hero' },
    { id: 1, name: 'About', icon: '👤', label: '[ABOUT]', hash: '#about' },
    { id: 2, name: 'Skills', icon: '⚡', label: '[SKILLS]', hash: '#skills' },
    { id: 3, name: 'Methodology', icon: '🔧', label: '[METHOD]', hash: '#process' },
    { id: 4, name: 'Contact', icon: '📞', label: '[CONTACT]', hash: '#contact' }
  ]

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll when hash changes directly (like going backwards/forwards in history)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
         const el = document.querySelector(location.hash)
         if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash, location.pathname])

  const handleChapterClick = (chapter) => {
    // If not on home page, push to home containing the hash
    if (location.pathname !== '/') {
      navigate(`/${chapter.hash}`)
    } else {
      const targetElement = document.querySelector(chapter.hash)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback
        navigate(`/${chapter.hash}`)
      }
    }
    setCurrentChapter(chapter.id)
    setIsOpen(false)
  }

  const handleActivityNav = (hash) => {
    navigate(`/activity${hash}`)
    setActivityOpen(false)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (location.pathname !== '/') navigate('/');
            else document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-green-400 text-lg font-mono cursor-pointer font-bold"
        >
          <span className="text-red-500">[</span>OM VIVEK MEHTA<span className="text-red-500">]</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {chapters.map((chapter) => (
            <motion.button
              key={chapter.id}
              onClick={() => handleChapterClick(chapter)}
              className={`text-sm font-mono transition-colors duration-300 ${currentChapter === chapter.id && location.pathname === '/'
                  ? 'text-green-400'
                  : 'text-gray-400 hover:text-green-300'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {chapter.label}
            </motion.button>
          ))}

          {/* Activity Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActivityOpen(true)}
            onMouseLeave={() => setActivityOpen(false)}
          >
            <motion.button
              className={`text-sm font-mono transition-colors duration-300 flex items-center gap-1 ${location.pathname === '/activity' ? 'text-red-400 font-bold' : 'text-gray-400 hover:text-red-300'}`}
              whileHover={{ scale: 1.1 }}
            >
              [ACTIVITY] <span className="text-[10px]">▼</span>
            </motion.button>
            
            <AnimatePresence>
              {activityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 bg-black/90 border border-red-500/30 backdrop-blur-md rounded-lg overflow-hidden py-2 shadow-[0_0_15px_rgba(239,68,68,0.15)] flex flex-col w-56"
                >
                  <button onClick={() => handleActivityNav('#projects')} className="text-sm font-mono text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors">
                    ⚔️ PROJECTS-EXPLOITS
                  </button>
                  <button onClick={() => handleActivityNav('#youtube')} className="text-sm font-mono text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors">
                    ▶ MY YOUTUBE VIDEOS
                  </button>
                  <button onClick={() => handleActivityNav('#articles')} className="text-sm font-mono text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors">
                    📝 MY ARTICLES
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a
            href="/resume.pdf"
            download="Om_Vivek_Mehta_Resume.pdf"
            className="text-sm font-mono px-4 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↓ Resume
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-green-400 text-2xl font-mono"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? '[X]' : '[☰]'}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-black/95 border border-green-400/30 backdrop-blur-md rounded-lg overflow-hidden"
          >
            {chapters.map((chapter) => (
              <motion.button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter)}
                className={`w-full text-left px-6 py-3 text-sm font-mono transition-colors duration-300 ${currentChapter === chapter.id && location.pathname === '/'
                    ? 'text-green-400 bg-green-400/10 border-l-2 border-green-400'
                    : 'text-gray-400 hover:text-green-300 hover:bg-green-400/5'
                  }`}
                whileHover={{ x: 10 }}
              >
                {chapter.icon} {chapter.label}
              </motion.button>
            ))}
            
            {/* Mobile Activity Section */}
            <div className="w-full text-left px-6 py-2 text-sm font-mono text-red-400 bg-red-900/10 border-t border-red-500/20 mt-2">
              [ACTIVITY]
            </div>
            <motion.button onClick={() => handleActivityNav('#projects')} className="w-full text-left px-8 py-3 text-sm font-mono text-gray-400 hover:text-white hover:bg-red-500/10 transition-colors">
              ⚔️ PROJECTS-EXPLOITS
            </motion.button>
            <motion.button onClick={() => handleActivityNav('#youtube')} className="w-full text-left px-8 py-3 text-sm font-mono text-gray-400 hover:text-white hover:bg-red-500/10 transition-colors">
              ▶ MY YOUTUBE VIDEOS
            </motion.button>
            <motion.button onClick={() => handleActivityNav('#articles')} className="w-full text-left px-8 py-3 text-sm font-mono text-gray-400 hover:text-white hover:bg-red-500/10 transition-colors">
              📝 MY ARTICLES
            </motion.button>
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Indicator (hide if not on home page) */}
      {location.pathname === '/' && (
        <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col space-y-2">
            {chapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentChapter === chapter.id
                    ? 'bg-green-400'
                    : 'bg-gray-600'
                  }`}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default Nav
