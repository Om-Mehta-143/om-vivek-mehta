const fs = require('fs');

let c = fs.readFileSync('src/pages/Home.jsx', 'utf-8');
c = c.replace(/\{\/\* Central Hero Content \*\/\}[\s\S]*?<div className="text-center max-w-4xl px-6">/, 
`{/* Central Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl px-6 flex flex-col md:flex-row items-center justify-center gap-12 mt-16 md:mt-0">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-green-500/30 glow-border shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10 shrink-0">
              <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 pointer-events-none"></div>
              <img src="/my_official_pic.png" alt="Om Vivek Mehta" className="w-full h-full object-cover filter contrast-125 hover:filter-none transition-all duration-500" />
            </motion.div>
            <div className="text-center md:text-left max-w-2xl">`);
            
c = c.replace(/<\/div>\s*<\/div>\s*\{\/\* Scroll indicator - Matrix style \*\/\}/, 
`          </div>
          </div>
        </div>
        
        {/* Scroll indicator - Matrix style */}`);

fs.writeFileSync('src/pages/Home.jsx', c);
