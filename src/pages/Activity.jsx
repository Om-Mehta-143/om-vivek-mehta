import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Activity = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
        window.scrollTo(0,0);
    }
  }, [location]);

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Projects / Exploits Section */}
        <section id="projects" className="mb-32">
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center pt-8"
          >
              <h2 className="text-6xl font-bold font-mono mb-4 text-white">
                  <span className="text-red-500">[</span>PROJECTS_EXPLOITS<span className="text-red-500">]</span>
              </h2>
              <div className="text-red-400 font-mono text-xl">
                  → Active research, built platforms, and ongoing exploits
              </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                  { title: 'ITGE — Identity & Trust Graph Engine', desc: 'Attack Path Dashboard focusing on visual reasoning.', tags: ['Neo4j', 'Python', 'FastAPI', 'D3.js'], link: '#', status: 'COMPLETE', color: 'green' },
                  { title: 'Defense Validation Platform', desc: 'Secure evaluation and validation of defensive configurations.', tags: ['Python', 'FastAPI'], link: '#', status: 'ACTIVE', color: 'red' },
                  { title: 'Car Evaluator', desc: 'Automated evaluation platform for embedded vehicle security.', tags: ['Hardware', 'Security'], link: '#', status: 'COMPLETE', color: 'blue' },
                  { title: 'Polyglot Code Analyser', desc: 'Static code analysis framework to detect vulnerabilities.', tags: ['Python', 'VS Code', 'Chrome Ext'], link: '#', status: 'DEVELOPING', color: 'yellow' },
                  { title: 'Personal AI Browser', desc: 'Privacy-focused custom browsing environment with local AI.', tags: ['AI', 'Browser Tech'], link: '#', status: 'DEVELOPING', color: 'purple' },
                  { title: 'AURUM Password Manager', desc: 'Zero-knowledge encrypted password vault.', tags: ['Cryptography', 'Secure Storage'], link: '#', status: 'COMPLETE', color: 'cyan' },
              ].map((proj, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
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
        </section>

        {/* YouTube Section */}
        <section id="youtube" className="mb-32 pt-16">
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
          >
              <h2 className="text-5xl border-b border-red-500/30 pb-4 inline-block font-bold font-mono mb-4 text-white">
                  <span className="text-red-500">▶</span> MY_YOUTUBE_VIDEOS
              </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'SYCS_25_EH_ SLA_02', code: 'QSuhQM8G_H8' },
                { title: 'SYCS_25_MPCA_SLA_STAGE_02', code: 'o1vOQ7pWPas' },
                { title: 'Self-Policing AI Tribunal -- Global iSAFE hackathon', code: 'MkbRrAs4Swc' },
                { title: 'FINAL VIDEO Odoo', code: 'hTtKKeGV3U0' },
                { title: 'How Computer Networks work - From data packets to the internet', code: 'jmoNLtqDLDg' },
                { title: 'DSGT STG III VDO', code: 'ovW7Cwf_BEU' },
                { title: 'OS SLA 2 VIDEO', code: 'b_I0Ah3d_Z8' },
                { title: 'OS SLA 3', code: 'Ar7gI3-gfGI' },
              ].map((vid, i) => (
                  <motion.a 
                      key={i} 
                      href={`https://www.youtube.com/watch?v=${vid.code}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="block group overflow-hidden rounded border border-gray-800 bg-gray-900/40 hover:border-red-500/50 hover:bg-black transition-all glow-border"
                  >
                      <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={`https://img.youtube.com/vi/${vid.code}/maxresdefault.jpg`} 
                            onError={(e) => { e.target.src = `https://img.youtube.com/vi/${vid.code}/hqdefault.jpg`; }}
                            alt={vid.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                          />
                          <div className="absolute inset-0 bg-red-500/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.7)]">
                                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                              </div>
                          </div>
                      </div>
                      <div className="p-4">
                          <h4 className="text-white font-mono text-xs mb-1 line-clamp-2">{vid.title}</h4>
                      </div>
                  </motion.a>
              ))}
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="mb-20 pt-16">
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
          >
              <h2 className="text-5xl border-b border-white/30 pb-4 inline-block font-bold font-mono mb-4 text-white">
                  <span className="text-white">📝</span> MY_ARTICLES
              </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Why Your CPU Lies About Its Speed: The Truth About Pipelining & Hazards', tags: ['Hardware', 'CPU Architecture'], isFeatured: false, link: 'https://medium.com/@om.mehta24/why-your-cpu-lies-about-its-speed-the-truth-about-pipelining-hazards-4b6c77ccf6b8' },
                { title: 'The Lies Your Code Tells You: A Brutally Honest Guide to Big O Notation', tags: ['Algorithms', 'Performance'], isFeatured: false, link: 'https://medium.com/@om.mehta24/the-lies-your-code-tells-you-a-brutally-honest-guide-to-big-o-notation-526d3effeadf' },
                { title: 'Thinking Like a Ghost: What the Darkest Corners of the Internet Taught Me About Ethical Hacking', tags: ['Ethical Hacking', 'OPSEC'], isFeatured: true, link: 'https://medium.com/@om.mehta24/thinking-like-a-ghost-what-the-darkest-corners-of-the-internet-taught-me-about-ethical-hacking-5f88851951dd' },
                { title: 'Introduction: Rising Stress and the Search for Inner Balance', tags: ['Self Improvement', 'Mindset'], isFeatured: false, link: 'https://medium.com/@om.mehta24/introduction-rising-stress-and-the-search-for-inner-balance-56c1e08223ca' },
                { title: 'Bridging the Gap: How Python Simplifies Data Structures and Algorithms for Beginners', tags: ['Python', 'DSA'], isFeatured: false, link: 'https://medium.com/@om.mehta24/bridging-the-gap-how-python-simplifies-data-structures-and-algorithms-for-beginners-463efe7e8e50' },
                { title: 'How Operating Systems Manage Memory and Processes', tags: ['OS', 'Memory Management'], isFeatured: false, link: 'https://medium.com/@om.mehta24/how-operating-systems-manage-memory-and-processes-d55262fbf984' },
                { title: 'Graph Coloring in Compiler Design: An Elegant Application of Discrete Mathematics', tags: ['Compilers', 'Discrete Math'], isFeatured: false, link: 'https://medium.com/@om.mehta24/graph-coloring-in-compiler-design-an-elegant-application-of-discrete-mathematics-20b4aef09365' },
                { title: 'How Computer Networks Work: From Data Packets to the Internet', tags: ['Networking', 'Protocols'], isFeatured: false, link: 'https://medium.com/@om.mehta24/how-computer-networks-work-from-data-packets-to-the-internet-cfd3f2a25cdd' }
              ].map((art, i) => (
                  <motion.a 
                      key={i} 
                      href={art.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`block flex-1 border ${art.isFeatured ? 'border-yellow-500/50 hover:border-yellow-400 bg-yellow-900/10' : 'border-gray-800 hover:border-white/50 bg-black/40'} p-5 hover:bg-black/80 transition-all rounded group relative overflow-hidden`}
                  >
                      {art.isFeatured && (
                        <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 font-mono transform translate-x-1 -translate-y-1 rounded-bl">
                          ★ FEATURED
                        </div>
                      )}
                      <h4 className="text-xl text-white font-mono mb-4 pr-10 group-hover:text-gray-300 leading-snug">{art.title}</h4>
                      <div className="flex justify-between items-center mt-auto">
                          <div className="flex gap-2">
                              {art.tags.map(t => <span key={t} className="text-xs font-mono border border-gray-600 px-2 py-1 text-gray-400 rounded">{t}</span>)}
                          </div>
                          <span className="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">Read Article →</span>
                      </div>
                  </motion.a>
              ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Activity;
