import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";

const Reviews = ({ reviews }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const renderStars = (rating) => {
    const safeRating = typeof rating === "number" ? rating : 0;
    const fullStars = Math.floor(safeRating);

    return (
      <div className="flex items-center justify-center gap-1" aria-label={`${safeRating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${i < fullStars ? "text-amber-400" : "text-slate-200"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute top-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary-500/8 blur-[120px]" />
      <div className="section-container relative">
        <SectionHeading
          label="Testimonials"
          title="Real stories from real learners"
          subtitle="See how our students are transforming their careers through hands-on learning and mentorship."
          className="mb-8 sm:mb-14"
        />

        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="!pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.name} className="flex h-full p-1">
              <article className="group flex h-full min-h-[300px] w-full flex-col justify-between rounded-[24px] border border-slate-300 bg-white p-5 shadow-card transition duration-200 hover:border-primary-300 hover:shadow-card-hover sm:min-h-[420px] sm:rounded-[28px] sm:p-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={`${review.name}, ${review.title}`}
                      className="h-14 w-14 rounded-full object-cover ring-4 ring-primary-100 sm:h-16 sm:w-16"
                    />
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent-500 ring-2 ring-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-slate-500">{review.title}</p>
                </div>

                <blockquote className="mt-4 flex-grow text-center">
                  <p className="text-sm leading-relaxed text-slate-600">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </blockquote>

                <div className="mt-6">{renderStars(review.rating)}</div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      comment: PropTypes.string,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default Reviews;
