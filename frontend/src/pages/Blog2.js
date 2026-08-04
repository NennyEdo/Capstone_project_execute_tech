import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/ui/AnimatedSection";
import Bgimage from "../assets/Blog/bgimage.png";
import zerotohero from "../assets/Blog/zerotohero.png";
import essential from "../assets/Blog/essential.png";
import mistakes from "../assets/Blog/mistakes.png";
import techfuture from "../assets/Blog/techfuture.png";

const BlogBackup = () => {
  const recentPosts = [
    {
      title: '10 Essential Skills for Breaking into Tech in 2024',
      description:
        'The tech industry is evolving rapidly. Discover the must-have skills that employers are looking for and how you can master them through our specialized courses.',
      date: 'November 10, 2024',
      imageUrl: essential,
    },
    {
      title: 'From Zero to Hero: How to Build Your First Website',
      description:
        'Follow this beginner-friendly guide to create a fully functional website using HTML, CSS, and JavaScript. Perfect for aspiring web developers!',
      date: 'November 7, 2024',
      imageUrl: zerotohero,
    },
    {
      title: 'The Future of Tech Careers: Trends to Watch in 2025',
      description:
        'Explore the emerging technologies and career paths poised to redefine the tech landscape in 2025 and beyond.',
      date: 'November 12, 2024',
      imageUrl: techfuture,
    },
    {
      title: '5 Mistakes to Avoid When Starting Your Tech Career',
      description:
        'Learn from others’ experiences and steer clear of these common pitfalls when starting your tech career.',
      date: 'November 8, 2024',
      imageUrl: mistakes,
    },
  ];

  const popularPosts = [
    {
      title: '10 Essential Skills for Breaking into Tech in 2024',
      description:
        'The tech industry is evolving rapidly. Discover the must-have skills that employers are looking for and how you can master them through our specialized courses.',
      date: 'November 10, 2024',
      imageUrl: essential,
    },
    {
      title: 'From Zero to Hero: How to Build Your First Website',
      description:
        'Follow this beginner-friendly guide to create a fully functional website using HTML, CSS, and JavaScript. Perfect for aspiring web developers!',
      date: 'November 7, 2024',
      imageUrl: zerotohero,
    },
    {
      title: 'The Future of Tech Careers: Trends to Watch in 2025',
      description:
        'Explore the emerging technologies and career paths poised to redefine the tech landscape in 2025 and beyond.',
      date: 'November 12, 2024',
      imageUrl: techfuture,
    },
    {
      title: '5 Mistakes to Avoid When Starting Your Tech Career',
      description:
        'Learn from others’ experiences and steer clear of these common pitfalls when starting your tech career.',
      date: 'November 8, 2024',
      imageUrl: mistakes,
    },
  ];

  const careerTipPosts = [
    {
      title: '10 Essential Skills for Breaking into Tech in 2024',
      description:
        'The tech industry is evolving rapidly. Discover the must-have skills that employers are looking for and how you can master them through our specialized courses.',
      date: 'November 10, 2024',
      imageUrl: essential,
    },
    {
      title: 'From Zero to Hero: How to Build Your First Website',
      description:
        'Follow this beginner-friendly guide to create a fully functional website using HTML, CSS, and JavaScript. Perfect for aspiring web developers!',
      date: 'November 7, 2024',
      imageUrl: zerotohero,
    },
    {
      title: 'The Future of Tech Careers: Trends to Watch in 2025',
      description:
        'Explore the emerging technologies and career paths poised to redefine the tech landscape in 2025 and beyond.',
      date: 'November 12, 2024',
      imageUrl: techfuture,
    },
    {
      title: '5 Mistakes to Avoid When Starting Your Tech Career',
      description:
        'Learn from others’ experiences and steer clear of these common pitfalls when starting your tech career.',
      date: 'November 8, 2024',
      imageUrl: mistakes,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([...recentPosts, ...popularPosts, ...careerTipPosts]);

  // Handle Search Change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter posts based on the search query across all post categories
    const filtered = [...recentPosts, ...popularPosts, ...careerTipPosts].filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <Navbar />
      <AnimatedSection className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-900 text-white text-center py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={Bgimage} // Replace with the image path
            alt="Background"
            className="object-cover w-full h-full opacity-60"
          />
        </div>

        <div className="relative z-10 pt-12">
          <h1 className="text-4xl font-bold mb-4">
            Insights & Innovations
          </h1>
          <p className="mb-8 pb-12 max-w-3xl mx-auto text-base leading-8">
            Stay updated with the latest trends, tips, and stories from the tech world.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-5xl mx-auto p-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search posts..."
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </AnimatedSection>

      <AnimatedSection className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <AnimatedSection
              key={index}
              className="rounded-[28px] border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              delay={index * 0.05}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3">{post.description}</p>
                <p className="text-gray-500 text-sm">Date: {post.date}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default BlogBackup;
