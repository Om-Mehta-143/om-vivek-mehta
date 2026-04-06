const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Replace Volatility link
content = content.replace(
  /{ name: 'Volatility', category: 'Memory Forensics', icon: '🧠', link: '#' }/,
  `{ name: 'Volatility', category: 'Memory Forensics', icon: '🧠', link: 'https://www.varonis.com/blog/how-to-use-volatility' }`
);

// 2. Remove Content Section
const contentSectionRegex = /\s*\{\/\* Content Section \*\/\}[\s\S]*?(?=\s*<\/div>\s*<\/section>\s*\{\/\* Methodology Section \*\/)/;
content = content.replace(contentSectionRegex, '');

// 3. Update Hero Section
const heroTarget = `        {/* Central Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">`;
          
const heroReplacement = `        {/* Central Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl px-6 flex flex-col md:flex-row items-center justify-center gap-16 mt-16 md:mt-0">
            <div className="relative w-40 h-40 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-green-500/30 glow-border shadow-[0_0_50px_rgba(34,197,94,0.3)] z-10 shrink-0">
              <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 pointer-events-none"></div>
              <img src="/my_official_pic.png" alt="Om Vivek Mehta" className="w-full h-full object-cover filter hover:filter-none transition-all duration-500 scale-105" />
            </div>
            <div className="text-center md:text-left max-w-2xl">`;

content = content.replace(heroTarget, heroReplacement);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Update completed successfully.');
