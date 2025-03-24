const Event = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Carousel
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <a className="font-medium" href="/">
                Dashboard /
              </a>
            </li>
            <li className="font-medium text-primary">Carousel</li>
          </ol>
        </nav>
      </div>
      <div className="flex flex-col gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
            <h3 className="font-medium text-black dark:text-white">
              Slider With Indicators
            </h3>
          </div>
          <div className="p-4 sm:p-6 xl:p-10">
            <div className="swiper swiper-initialized swiper-horizontal carouselTwo swiper-backface-hidden">
              <div
                className="swiper-wrapper"
                style={{
                  transitionDuration: "0ms",
                  transform: "translate3d(-922px, 0px, 0px)",
                }}
              >
                <div className="swiper-slide swiper-slide-prev w-[922px]">
                  <img src="/assets/carousel-02-f5c30c3c.jpg" alt="carousel" />
                </div>
                <div className="swiper-slide swiper-slide-active w-[922px]">
                  <img src="/assets/carousel-03-363a2eaf.jpg" alt="carousel" />
                </div>
                <div className="swiper-slide swiper-slide-next w-[992px]">
                  <img src="/assets/carousel-01-4765dfce.jpg" alt="carousel" />
                </div>
              </div>
              <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
                <span className="swiper-pagination-bullet"></span>
                <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
                <span className="swiper-pagination-bullet"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
