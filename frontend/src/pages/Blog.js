import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogList from "../components/BlogList";
import BlogDetail from "../components/BlogDetail";
import AnimatedSection from "../components/ui/AnimatedSection";
import PageHero from "../components/ui/PageHero";
import Bgimage from "../assets/Images/blogbg.png";
import zerotohero from "../assets/Blog/zerotohero.png";
import essential from "../assets/Blog/essential.png";
import mistakes from "../assets/Blog/mistakes.png";
import techfuture from "../assets/Blog/techfuture.png";
import { FaSearch } from "react-icons/fa";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const posts = [
    {
      title: "How AI-Powered Learning Platforms Are Redefining EdTech in 2026",
      category: "EdTech",
      author: "Amina Yusuf",
      readingTime: "8 min read",
      summary:
        "AI tutors, adaptive pathways, and learning analytics are creating personalised education journeys for tech learners. Discover how the best platforms help you build skills faster and smarter.",
      description: `
        <p>EdTech is being transformed by AI, and the biggest winners are learners who use platforms that adapt to their needs. This article explains the new learning experience model built around intelligent coaching, growth tracking, and real-world practice.</p>

        <h2>1. AI tutors that personalise every lesson</h2>
        <p>Modern platforms identify your strengths, recommend the next best topic, and bring the right challenge at the right time. This keeps learners engaged and prevents overload.</p>

        <h2>2. Data-driven skill maps</h2>
        <p>Learning analytics now map skills across courses and career pathways. EdTech products can show you exactly which competencies you need to reach your first job or first promotion.</p>

        <h2>3. Micro-learning for busy learners</h2>
        <p>Short, focused modules help learners progress consistently, even with busy schedules. This approach works especially well for people balancing studies with work or family responsibilities.</p>

        <h2>4. Project-based validation</h2>
        <p>The best EdTech platforms pair learning with portfolio-ready projects. That means you don’t just complete lessons — you create proof of skills that employers can evaluate.</p>

        <h2>5. Skills-first assessment</h2>
        <p>Instead of exams alone, today’s platforms use simulations, peer reviews, and applied tasks to measure real capability. This helps learners demonstrate what they can do, not just what they know.</p>

        <h2>Conclusion</h2>
        <p>AI-powered EdTech is not just a trend — it is the new standard for building job-ready tech skills. When you choose the right learning experience, you benefit from personalised coaching, clear progress tracking, and real project outcomes.</p>
      `,
      date: "June 24, 2026",
      imageUrl: essential,
    },
    {
      title: "Generative AI for Tech Learners: Build Faster with Copilot Workflows",
      category: "Tech Trends",
      author: "Tunde Adebola",
      readingTime: "7 min read",
      summary:
        "Generative AI is changing how developers learn and create. Learn the best ways to use copilot tools for coding, content, and project planning without losing control of your skills.",
      description: `
        <p>Generative AI is now part of the learner’s toolkit. From code assistants to idea generators, these tools can speed up development and help you explore new concepts faster.</p>

        <h2>1. Use AI to prototype, not to replace your thinking</h2>
        <p>AI can help generate code snippets, document functions, and suggest layout ideas. The key is to review, test, and learn from the output so your skills grow alongside the tool.</p>

        <h2>2. Improve your workflow with prompt engineering</h2>
        <p>Asking the right questions makes AI tools much more useful. Practice writing precise prompts that include context, constraints, and desired results.</p>

        <h2>3. Build real projects with assisted development</h2>
        <p>Use AI to speed up repetitive tasks while you focus on architecture, quality, and user experience. This is especially powerful for bootstrapping portfolios and solving complex problems.</p>

        <h2>4. Keep ownership of learning outcomes</h2>
        <p>Document what the AI created and why it works. This helps you internalize new patterns and explain your decisions in interviews.</p>

        <h2>5. Balance productivity with critical thinking</h2>
        <p>AI suggestions are not always correct. Treat them as a second opinion and validate every line of code or design choice before moving on.</p>

        <h2>Conclusion</h2>
        <p>Generative AI is a powerful learning partner when used intentionally. It can accelerate your progress, but the most reliable learners are those who stay curious, test carefully, and learn from every result.</p>
      `,
      date: "June 22, 2026",
      imageUrl: zerotohero,
    },
    {
      title: "Skills-First Hiring, Micro-Credentials, and Career-Ready Portfolios",
      category: "Career Strategy",
      author: "Sara Nnaji",
      readingTime: "6 min read",
      summary:
        "Employers want real skills over titles. Discover how micro-credentials, project portfolios, and practical assessments can make your application stand out in 2026.",
      description: `
        <p>The tech hiring market is shifting toward skills-first evaluation. This means your learning path should focus on measurable outcomes, demonstrable projects, and clear proof of ability.</p>

        <h2>1. What hiring managers look for now</h2>
        <p>Employers increasingly value specific competencies like cloud deployment, automated testing, and collaborative engineering. Build evidence of those skills in your portfolio.</p>

        <h2>2. The rise of micro-credentials</h2>
        <p>Short, verified certifications are useful when they map directly to career-ready skills. Choose micro-credentials from trusted providers, especially for AI, cloud, and data literacy.</p>

        <h2>3. Portfolio work beats a long resume</h2>
        <p>A small set of polished projects is more persuasive than a long list of courses. Show what you built, your process, and the impact of the result.</p>

        <h2>4. Learn with practical assessments</h2>
        <p>Simulations, group challenges, and real-world tasks are stronger evidence of readiness than quizzes alone. Look for learning programmes that include applied assessments.</p>

        <h2>5. Tell a clear learning story</h2>
        <p>Explain how each project, credential, and skill connects to the next step in your career. A strong narrative helps recruiters understand your growth and your direction.</p>

        <h2>Conclusion</h2>
        <p>Skills-first hiring is your advantage when you build a clear, portfolio-driven learning path. Focus on credentials that matter, projects that prove your ability, and storytelling that highlights your progress.</p>
      `,
      date: "June 20, 2026",
      imageUrl: techfuture,
    },
    {
      title: "Learning in the Hybrid Era: Remote Collaboration, Digital Skills, and EdTech Best Practices",
      category: "EdTech",
      author: "Emeka Olaniyan",
      readingTime: "5 min read",
      summary:
        "The hybrid world demands remote collaboration skills, digital fluency, and learning habits that work from anywhere. Learn how to thrive in the modern tech education ecosystem.",
      description: `
        <p>Hybrid learning and distributed teams are the norm in tech. The right skills now include not just coding, but the ability to collaborate across time zones, tools, and remote workflows.</p>

        <h2>1. Master remote-friendly communication</h2>
        <p>Use clear writing, status updates, and documentation. These habits help you work effectively with teammates you may never meet in person.</p>

        <h2>2. Build fluency with the tools teams use</h2>
        <p>Learn Git, code review practices, cloud consoles, and collaboration platforms. These tools are part of everyday workflows for modern engineering teams.</p>

        <h2>3. Choose active learning over passive content</h2>
        <p>Live sessions, mentor check-ins, and group projects create accountability and faster progress. Active learning is more effective than watching videos alone.</p>

        <h2>4. Keep your learning portable</h2>
        <p>Store your work in GitHub, document your process in a blog or portfolio, and keep your credentials easy to share. This makes it simple for recruiters and mentors to see your progress.</p>

        <h2>5. Balance speed with depth</h2>
        <p>A hybrid learning ecosystem offers many paths, but deep understanding still matters. Prioritize quality practice and real results over chasing every new course.</p>

        <h2>Conclusion</h2>
        <p>Learning for the hybrid era is about flexibility, collaboration, and practical output. Build skills that work anywhere, and choose programmes that support remote-ready learning habits.</p>
      `,
      date: "June 26, 2026",
      imageUrl: mistakes,
    },
    {
      title: "Learning Analytics and Competency-Based EdTech: What Students Need Now",
      category: "EdTech",
      author: "Jide Danjuma",
      readingTime: "6 min read",
      summary:
        "Learning analytics and competency-based education are making learning outcomes more transparent. Find out how these tools help learners track progress and focus on mastery instead of completion.",
      description: `
        <p>Learning analytics and competency-based education are changing how learners and educators measure progress. The focus is shifting from hours spent to skills mastered.</p>

        <h2>1. Clear learning pathways</h2>
        <p>Competency-based platforms map out the exact skills you need to master. This makes learning more efficient and lets you move at your own pace.</p>

        <h2>2. Real-time learning feedback</h2>
        <p>Analytics dashboards show where you are strong and where you need practice. These insights help you remove guesswork from your learning journey.</p>

        <h2>3. Skill mastery over course completion</h2>
        <p>Instead of just finishing a module, competency-based systems reward true mastery. This is especially powerful for technical skills, where real ability matters.</p>

        <h2>4. Better alignment with career goals</h2>
        <p>When learning is tied to specific competencies, it becomes easier to connect your progress to real job requirements. That makes your portfolio more meaningful.</p>

        <h2>5. Learning that adapts to you</h2>
        <p>Platforms using analytics can personalize the next step based on your performance. This means fewer repeat lessons and more targeted practice.</p>

        <h2>Conclusion</h2>
        <p>Choosing learning paths with strong analytics and competency tracking helps you study smarter. You get a clearer view of your progress and stronger confidence in the skills you’ve earned.</p>
      `,
      date: "June 27, 2026",
      imageUrl: techfuture,
    },
    {
      title: "Digital Credentials, Blockchain Certificates, and the Future of Student Proof",
      category: "EdTech",
      author: "Nkechi Udo",
      readingTime: "6 min read",
      summary:
        "Digital credentials and blockchain certificates are making academic achievement verifiable and portable. Learn how modern learners can use secure proof of skill to stand out in hiring and project work.",
      description: `
        <p>Digital credentials are becoming a trusted way to prove skills and achievements. Blockchain-backed certificates add transparency and make it easier to share verified proof of learning.</p>

        <h2>1. Why digital credentials matter</h2>
        <p>Employers want reliable proof of what you can do. Digital credentials make your achievements easy to verify and harder to fake.</p>

        <h2>2. Secure proof with blockchain</h2>
        <p>Blockchain certificates store proof in a tamper-resistant ledger. This gives learners confidence that their credentials will remain valid and accepted.</p>

        <h2>3. Portability for global careers</h2>
        <p>Digital credentials travel with you across job applications, education platforms, and overseas opportunities. That makes it easier to build a consistent learning story.</p>

        <h2>4. Choosing the right credential</h2>
        <p>Look for credentials backed by reputable providers and aligned with specific skills. The most valuable ones map directly to real-world roles and tools.</p>

        <h2>5. Showcasing your proof</h2>
        <p>Add digital credentials to your portfolio, LinkedIn profile, and job applications. When recruiters can verify your claims instantly, your profile becomes more compelling.</p>

        <h2>Conclusion</h2>
        <p>Digital credentials and blockchain certificates are helping learners prove their skills with confidence. In a competitive market, this type of proof can make your learning journey more visible and trusted.</p>
      `,
      date: "June 28, 2026",
      imageUrl: essential,
    },
  ];

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        (post.summary && post.summary.toLowerCase().includes(query))
    );
  }, [searchQuery, posts]);

  return (
    <div className="page-shell">
      <Navbar />

      <PageHero
        label="Insights for ambitious learners"
        title="Insights & innovations that move your career forward"
        subtitle="Stay updated with the latest tech trends, job-ready skills, and practical learning strategies."
        backgroundImage={Bgimage}
      />

      <main className="section-container py-14">
        {!selectedPost && (
          <AnimatedSection className="mb-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
            <div className="relative">
              <label htmlFor="blog-search" className="sr-only">
                Search posts
              </label>
              <input
                id="blog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="input-field !rounded-full !py-3.5 !pr-12"
              />
              <FaSearch
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <p>{filteredPosts.length} posts available</p>
              {searchQuery && <p>Showing matches for &ldquo;{searchQuery}&rdquo;</p>}
            </div>
          </AnimatedSection>
        )}

        {selectedPost ? (
          <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <BlogList posts={filteredPosts} onSelectPost={setSelectedPost} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
