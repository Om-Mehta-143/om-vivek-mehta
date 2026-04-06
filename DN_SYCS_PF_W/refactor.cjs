const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Rename App to Home
content = content.replace(/function App\(\) \{/g, 'function Home() {');
content = content.replace(/export default App/g, 'export default Home');
content = content.replace(/import Nav from '\.\/components\/Nav'/g, '');
content = content.replace(/import Footer from '\.\/components\/Footer'/g, '');

// 2. Remove <Nav /> and <Footer /> instances inside the render
content = content.replace(/<Nav \/>\s*/g, '');
content = content.replace(/<Footer \/>\s*/g, '');

// 3. Remove the entire <section id="work"> block
const workRegex = /{[\s\S]*?\/\*(?: Work Section| Projects Section| Hacker Projects) \*\/[\s\S]*?<section id="work"[\s\S]*?<\/section>/m;
content = content.replace(workRegex, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Home.jsx has been updated.');
