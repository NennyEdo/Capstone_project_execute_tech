import React, { useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogDetail = ({ post, onBack }) => {
  const detailRef = useRef(null);

  useEffect(() => {
    if (post && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [post]);

  if (!post) return null;

  return (
    <section className="mx-auto max-w-4xl py-4" ref={detailRef}>
      <button
        type="button"
        className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        onClick={onBack}
      >
        <IoMdArrowBack aria-hidden="true" />
        Back to Posts
      </button>

      <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 font-semibold text-primary-700">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
          <span>By {post.author}</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {post.title}
        </h1>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-8 w-full rounded-[28px] object-cover shadow-card"
          />
        )}

        <div
          className="prose-edutech mt-8"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />

        <div className="mt-12 overflow-hidden rounded-[28px] bg-navy-950 p-8 text-white">
          <h2 className="font-display text-2xl font-bold">Ready to apply these insights?</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Explore our programmes and select the learning path that helps you land your next tech role with confidence.
          </p>
          <Link to="/courses" className="btn-accent mt-6">
            Explore Courses
          </Link>
        </div>
      </article>
    </section>
  );
};

BlogDetail.propTypes = {
  post: PropTypes.shape({
    category: PropTypes.string,
    author: PropTypes.string,
    readingTime: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  onBack: PropTypes.func,
};

export default BlogDetail;
