import React from "react";
import PropTypes from "prop-types";

const BlogList = ({ posts, onSelectPost }) => {
  return (
    <section>
      <div className="mb-10 overflow-hidden rounded-[28px] bg-navy-950 p-8 text-white shadow-card sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-300">
          Premium insights
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          The latest trends shaping careers in tech and EdTech
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Explore in-depth analysis, practical career advice, and modern learning strategies created for ambitious learners looking to thrive in the digital economy.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.title}
            onClick={() => onSelectPost(post)}
            onKeyDown={(e) => e.key === "Enter" && onSelectPost(post)}
            role="button"
            tabIndex={0}
            className="group cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card transition duration-200 hover:border-primary-200 hover:shadow-card-hover"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-64">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 font-semibold text-primary-700">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 sm:text-2xl">
                {post.title}
              </h3>
              <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                {post.summary}
              </p>
              <div className="flex items-center justify-between text-sm font-semibold text-primary-600">
                <span>{post.author}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  Read story →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      date: PropTypes.string,
      summary: PropTypes.string,
      category: PropTypes.string,
      author: PropTypes.string,
      readingTime: PropTypes.string,
    })
  ).isRequired,
  onSelectPost: PropTypes.func.isRequired,
};

export default BlogList;
