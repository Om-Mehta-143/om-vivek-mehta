import re

file_path = r'c:\Users\EGOIST\Desktop\mpf\DN_SYCS_PF_W\src\App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add RoleTyper component
role_typer_code = """
// Role Typer Animation Component
const RoleTyper = () => {
    const roles = ["Ethical Hacker", "Red Teamer", "Security Consultant", "Freelance Web Developer"];
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                setText(currentRole.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setRoleIndex((roleIndex + 1) % roles.length);
                }
            } else {
                setText(currentRole.substring(0, text.length + 1));
                if (text.length === currentRole.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <span className="text-green-300 font-mono">
            {text}<span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1 align-middle"></span>
        </span>
    );
}

"""

if "const RoleTyper" not in content:
    content = content.replace("const HackerScene = () => {", role_typer_code + "const HackerScene = () => {")

# Replace static role with RoleTyper
hero_target = """<div className="text-xl md:text-2xl text-green-300 font-mono mb-4">
                                <span className="animate-pulse">[</span>
                                CYBERSECURITY STUDENT &amp; RED TEAMER
                                <span className="animate-pulse">]</span>
                            </div>"""

hero_replacement = """<div className="text-xl md:text-2xl font-mono mb-4">
                                <span className="text-white animate-pulse">[</span>
                                <RoleTyper />
                                <span className="text-white animate-pulse">]</span>
                            </div>"""
content = content.replace(hero_target, hero_replacement)


# 2. Update ABOUT_ME
about_target = """<h3 className="text-2xl font-bold text-blue-400 font-mono mb-4">
                                    [MISSION_STATEMENT]
                                </h3>"""
# Make the mission statement match their request - wait I will leave Mission statement as is for now, just style it better later if needed. The request says "Terminal card with name, role, location, specialization... Mission statement paragraph. Achievements list." The current implementation already looks like a terminal card for the first block, and separate cards for Mission & Achievements. I will unify them.

about_section_pattern = re.compile(r'(<section id="about".*?)</section>', re.DOTALL)
about_section_replacement = """<section id="about" className="min-h-screen bg-gradient-to-b from-black via-blue-900/10 to-black flex items-center justify-center py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-bold font-mono mb-4">
                            <span className="text-blue-500">[</span>
                            <span className="text-white">ABOUT_ME</span>
                            <span className="text-blue-500">]</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="border border-green-400/30 bg-black/80 p-8 rounded-lg font-mono shadow-[0_0_15px_rgba(34,197,94,0.1)] glow-border"
                        >
                            <div className="border-b border-green-400/30 pb-4 mb-6">
                                <span className="text-red-500">root@hackersystem</span>
                                <span className="text-white">:</span>
                                <span className="text-blue-400">~/profile</span>
                                <span className="text-white">$ cat about.txt</span>
                            </div>

                            <div className="space-y-4 text-green-300 text-sm leading-relaxed mb-8">
                                <div><span className="text-yellow-400 w-32 inline-block">NAME:</span> OM VIVEK MEHTA</div>
                                <div><span className="text-yellow-400 w-32 inline-block">ROLE:</span> Ethical Hacker | Red Teamer | Security Consultant</div>
                                <div><span className="text-yellow-400 w-32 inline-block">LOCATION:</span> India (Open to Remote)</div>
                                <div><span className="text-yellow-400 w-32 inline-block">SPECIALIZATION:</span> Web App Pentesting, Network Security, Automation</div>
                                <div><span className="text-yellow-400 w-32 inline-block">CERTIFICATIONS:</span> OSCP (Planned), CEH (Planned), Palo Alto (x3)</div>
                            </div>
                            
                            <div className="mb-8">
                                <h3 className="text-blue-400 font-bold mb-2">[MISSION_STATEMENT]</h3>
                                <p className="text-gray-300">
                                    I'm an ambitious cybersecurity student with a vision to become one of the youngest elite ethical hackers.
                                    Currently pursuing a BTech in Cybersecurity, I'm focused on mastering networking, penetration testing,
                                    and automation. My mission is to identify vulnerabilities before attackers do, sharpen my technical
                                    expertise daily, and build a portfolio that demonstrates real-world execution.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-purple-400 font-bold mb-2">[ACHIEVEMENTS]</h3>
                                <ul className="space-y-1 text-gray-300">
                                    <li><span className="text-green-400 mr-2">✓</span>Completed multiple networking & cybersecurity lab projects</li>
                                    <li><span className="text-green-400 mr-2">✓</span>Built custom scripts for automating assignments & workflows</li>
                                    <li><span className="text-green-400 mr-2">✓</span>Hands-on with penetration testing tools: Nmap, Wireshark, Burp Suite, Metasploit</li>
                                    <li><span className="text-green-400 mr-2">✓</span>Active in CTFs & bug bounty practice</li>
                                    <li><span className="text-green-400 mr-2">✓</span>Founder of Anom Shield</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>"""
content = about_section_pattern.sub(about_section_replacement, content, count=1)


# 3. Update ARSENAL
arsenal_target = """{[
                                { name: 'Burp Suite', category: 'Web Testing', icon: '🕷️', link: 'https://portswigger.net/burp' },
                                { name: 'Metasploit', category: 'Exploitation', icon: '💥', link: 'https://www.metasploit.com/' },
                                { name: 'Nmap', category: 'Scanning', icon: '🔍', link: 'https://nmap.org/book/man.html' },
                                { name: 'Wireshark', category: 'Network Analysis', icon: '📡', link: 'https://www.wireshark.org/docs/' },
                                { name: 'SQLMap', category: 'Database', icon: '🗄️', link: 'http://sqlmap.org/' },
                                { name: 'Cobalt Strike', category: 'C2 Framework', icon: '🎯', link: 'https://www.cobaltstrike.com/' },
                                { name: 'Ghidra', category: 'Reverse Engineering', icon: '🔧', link: 'https://ghidra-sre.org/' },
                                { name: 'YARA', category: 'Malware Detection', icon: '🛡️', link: 'https://yara.readthedocs.io/en/stable/' },
                                { name: 'Volatility', category: 'Memory Forensics', icon: '🧠', link: 'https://www.google.com/search?q=volatility+memory+forensics+tutorial' },
                                { name: 'Hashcat', category: 'Password Cracking', icon: '🔐', link: 'https://hashcat.net/hashcat/' },
                                { name: 'Aircrack-ng', category: 'Wireless', icon: '📶', link: 'https://www.aircrack-ng.org/doku.php' },
                                { name: 'OWASP ZAP', category: 'Web Security', icon: '⚡', link: 'https://www.zaproxy.org/getting-started/' }
                            ]"""

arsenal_replacement = """{[
                                { name: 'Burp Suite', category: 'Web Testing', icon: '🕷️', link: 'https://portswigger.net/burp' },
                                { name: 'Metasploit', category: 'Exploitation', icon: '💥', link: 'https://www.metasploit.com/' },
                                { name: 'Volatility', category: 'Memory Forensics', icon: '🧠', link: '#' },
                                { name: 'Wireshark', category: 'Network Analysis', icon: '📡', link: 'https://www.wireshark.org/' },
                                { name: 'Nmap', category: 'Scanning', icon: '🔍', link: 'https://nmap.org/' },
                                { name: 'Nessus', category: 'Vulnerability Scanner', icon: '🛡️', link: 'https://www.tenable.com/products/nessus' },
                                { name: 'SQLMap', category: 'Database', icon: '🗄️', link: 'http://sqlmap.org/' },
                                { name: 'Hydra', category: 'Brute Force', icon: '🗝️', link: 'https://github.com/vanhauser-thc/thc-hydra' },
                                { name: 'Aircrack-ng', category: 'Wireless', icon: '📶', link: 'https://www.aircrack-ng.org/' },
                                { name: 'John the Ripper', category: 'Password Cracking', icon: '🔓', link: 'https://www.openwall.com/john/' }
                            ]"""
content = content.replace(arsenal_target, arsenal_replacement)
content = content.replace('hover:border-green-400 transition-all duration-300 group cursor-pointer block"', 'glow-border transition-all duration-300 group cursor-pointer block border-cyan-400/30 bg-black/60"')


# 4. CERTIFICATIONS REPLACE block
cert_target_pattern = re.compile(r'\{\/\* Certifications \*\/.*?\}</section>', re.DOTALL)
cert_replacement = """{/* Certifications & Frameworks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="border border-green-400/30 bg-black/80 p-8 rounded-lg glow-border"
                        >
                            <h3 className="text-2xl font-bold text-green-400 font-mono mb-6">[CERTIFICATIONS_COMPLETED]</h3>
                            <div className="space-y-4">
                                {[
                                    { cert: '[CERT_1]', issuer: 'Issuer Placeholder', date: '2024' },
                                    { cert: '[CERT_2]', issuer: 'Issuer Placeholder', date: '2023' },
                                    { cert: '[CERT_3]', issuer: 'Issuer Placeholder', date: '2023' },
                                ].map((c, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-green-400/20 pb-2">
                                        <div>
                                            <div className="text-white font-mono font-bold">{c.cert}</div>
                                            <div className="text-gray-400 text-xs">{c.issuer}</div>
                                        </div>
                                        <div className="text-green-500 text-xs font-mono bg-green-500/10 px-2 py-1 rounded">{c.date}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="border border-yellow-400/30 bg-black/80 p-8 rounded-lg"
                        >
                            <h3 className="text-2xl font-bold text-yellow-400 font-mono mb-6">[CERTIFICATIONS_PLANNED]</h3>
                            <div className="space-y-4">
                                {['OSCP', 'CEH', 'CISSP', 'GPEN'].map((c, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-yellow-400/20 pb-2">
                                        <div className="text-gray-300 font-mono font-bold">{c}</div>
                                        <div className="text-yellow-500 text-xs font-mono bg-yellow-500/10 px-2 py-1 rounded flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span> IN PROGRESS
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>"""
content = cert_target_pattern.sub(cert_replacement, content, count=1)


# Remove SystemsSection declaration and usage
systems_data_pattern = re.compile(r'const systemsData = \[.*?\];', re.DOTALL)
systems_section_pattern = re.compile(r'const SystemsSection = \(\) => \{.*?\}\s*\n', re.DOTALL)

content = systems_data_pattern.sub('', content)
content = systems_section_pattern.sub('', content)
content = content.replace('{/* Systems Section (Safe Mode) */}\n            <SystemsSection />', '')
content = content.replace('{/* Systems Section (Safe Mode) */}\n            {/* Systems Section (Safe Mode) */}\n            <SystemsSection />', '')


# 5. PROJECTS, HACKATHONS, CONTENT Sections
work_section_pattern = re.compile(r'<section id="work".*?</section>', re.DOTALL)
new_sections = """<section id="work" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Projects Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-6xl font-bold font-mono mb-4 text-white">
                            <span className="text-red-500">[</span>PROJECTS_EXPLOITS<span className="text-red-500">]</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                        {[
                            { title: 'ITGE — Identity & Trust Graph Engine', desc: 'Attack Path Dashboard focusing on visual reasoning and automated validation.', tags: ['Neo4j', 'Python', 'FastAPI', 'D3.js'], link: '#', status: 'ACTIVE', color: 'red' },
                            { title: 'Defense Validation Platform', desc: 'Secure evaluation and validation of defensive configurations against mapped attack frameworks.', tags: ['Python', 'FastAPI'], link: '#', status: 'COMPLETE', color: 'green' },
                            { title: 'Car Evaluator', desc: 'Automated evaluation platform for embedded vehicle security.', tags: ['Hardware', 'Security'], link: '#', status: 'COMPLETE', color: 'blue' },
                            { title: 'Polyglot Code Analyser', desc: 'Static code analysis framework to detect vulnerabilities across multiple languages natively.', tags: ['Python', 'VS Code', 'Chrome Ext'], link: '#', status: 'DEVELOPING', color: 'yellow' },
                            { title: 'Personal AI Browser', desc: 'Privacy-focused custom browsing environment with integrated local AI capabilities.', tags: ['AI', 'Browser Tech'], link: '#', status: 'DEVELOPING', color: 'purple' },
                            { title: 'AURUM Password Manager', desc: 'Zero-knowledge encrypted password vault utilizing modern web cryptography algorithms.', tags: ['Cryptography', 'Secure Storage'], link: '#', status: 'COMPLETE', color: 'cyan' },
                        ].map((proj, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`border border-${proj.color}-400/30 bg-black/80 rounded-lg p-6 glow-border group flex flex-col`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className={`text-lg font-bold text-${proj.color}-400 font-mono`}>{proj.title}</h3>
                                    <div className={`text-${proj.color}-500 text-[10px] font-mono border border-${proj.color}-500/50 px-2 rounded`}>{proj.status}</div>
                                </div>
                                <p className="text-gray-300 text-sm font-mono mb-4 flex-1">{proj.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {proj.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{tag}</span>
                                    ))}
                                </div>
                                <div>
                                    <a href={proj.link} className={`text-${proj.color}-400 hover:text-${proj.color}-300 font-mono text-sm underline`}>GitHub/Demo →</a>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Hackathons & CTFs */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-4xl font-bold font-mono mb-4 text-white">
                            <span className="text-orange-500">[</span>HACKATHONS_&_CTFS<span className="text-orange-500">]</span>
                        </h2>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        {[
                            { name: '[HACKATHON_1]', position: 'Winner / Finalist', date: 'Oct 2025', org: 'Organizer Name' },
                            { name: '[CTF_1]', position: 'Top 10', date: 'Aug 2025', org: 'Organizer Name' },
                            { name: '[CTF_2]', position: 'Participant', date: 'Jan 2024', org: 'Organizer Name' }
                        ].map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="border-l-2 border-orange-500 bg-gray-900/50 p-4 font-mono group hover:bg-gray-800/80 transition-colors"
                            >
                                <div className="text-orange-400 font-bold mb-1">{event.name}</div>
                                <div className="text-white text-sm mb-2">{event.position}</div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{event.org}</span>
                                    <span>{event.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-red-500 font-mono mb-6 flex items-center gap-2">
                                <span className="text-3xl">▶</span> YOUTUBE_LOGS
                            </h3>
                            <div className="space-y-4">
                                {[1, 2].map(i => (
                                    <a key={i} href="#" className="flex gap-4 border border-gray-800 bg-black/40 p-3 hover:border-red-500/50 hover:bg-black/60 transition-all rounded group">
                                        <div className="w-32 h-20 bg-gray-900 border border-gray-700 flex items-center justify-center overflow-hidden relative">
                                            <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                            <span className="text-xs text-gray-500 font-mono z-0">THUMBNAIL_{i}</span>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-white font-mono text-sm mb-1 group-hover:text-red-400">Video Title Placeholder {i}</h4>
                                            <span className="text-xs text-gray-500 font-mono">Subject: Cybersecurity</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-2">
                                <span className="text-3xl">📝</span> MEDIUM_ARTICLES
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: 'Article Title Placeholder 1', time: '5 min read', tags: ['Threat Hunting', 'DFIR'] },
                                    { title: 'Article Title Placeholder 2', time: '8 min read', tags: ['Reverse Engineering'] }
                                ].map((art, i) => (
                                    <a key={i} href="#" className="block border border-gray-800 bg-black/40 p-4 hover:border-white/50 hover:bg-black/60 transition-all rounded group">
                                        <h4 className="text-lg text-white font-mono mb-2 group-hover:text-gray-300">{art.title}</h4>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {art.tags.map(t => <span key={t} className="text-[10px] border border-gray-600 px-1 py-0.5 text-gray-400 rounded">{t}</span>)}
                                            </div>
                                            <span className="text-xs text-gray-500 font-mono">{art.time}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>"""
content = work_section_pattern.sub(new_sections, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("App.jsx has been updated successfully.")
