function initSwiper(elem, options) {
    const defaults = {
      speed: 1e3,
      slideScale: 0.6,
      imgScale: 1.2,
      slideScaleDuration: 850,
      imageScaleDuration: 850,
      titleOpacityFadeOutDuration: 850,
      titleOpacityFadeInDuration: 850,
    };
    let params = {...defaults, ...options};
    const speed = params.speed,
      slideScale = params.slideScale,
      imgScale = params.imgScale,
      slideScaleDuration = params.slideScaleDuration,
      imageScaleDuration = params.imageScaleDuration,
      titleOpacityFadeOutDuration = params.titleOpacityFadeOutDuration,
      titleOpacityFadeInDuration = params.titleOpacityFadeInDuration;
    
    const swiper = elem.querySelector(".swiper");
    let activeTransitionEnd = false,
      activeTransitionStart = false,
      animationFrame;
    
    const slideTransition = (elem) => {
        elem.addClass("fancy-slider-no-transition"),
        (activeTransitionStart = true),
        cancelAnimationFrame(animationFrame),
        (animationFrame = requestAnimationFrame(() => {
          elem.removeClass("fancy-slider-no-transition"), (activeTransitionStart = false), (activeTransitionEnd = false);
        }));
      },
      navButtonFn = (elem) => {
        elem.$el.find(".fancy-slider-button-next").on("click", () => {
          activeTransitionEnd || elem.slideNext();
        }),
        elem.$el.find(".fancy-slider-button-prev").on("click", () => {
          activeTransitionEnd || elem.slidePrev();
        });
      },
      disableButton = (elem) => {
        elem.$el
          .find(".fancy-slider-button-next, .fancy-slider-button-prev")
          .off("click");
      };
    return new Swiper(swiper, {
      speed: speed,
      allowTouchMove: false,
      parallax: true,
      on: {
        transitionStart(elem) {
          const {
              slides: slides,
              previousIndex: prevIndex,
              activeIndex: activeIndex,
              $el: element
            } = elem;
          
          activeTransitionStart || (activeTransitionEnd = true);
          
          const activeSlide = slides.eq(activeIndex),
            prevSlide = slides.eq(prevIndex),
            prevSlideScale = prevSlide.find(".fancy-slider-scale"),
            prevSlideImage = prevSlide.find("img"),
            activeSlideImage = activeSlide.find("img"),
            //p = activeIndex - prevIndex,
            activeSlideBgColor = activeSlide.attr("data-slide-bg-color");
          
          element.css("background-color", activeSlideBgColor),
            prevSlideScale
              .transition(slideScaleDuration)
              .transform("scale(" + slideScale + ")"),
            prevSlideImage
              .transition(imageScaleDuration)
              .transform("scale(" + imgScale + ")"),
            prevSlide
              .find(".fancy-slider-title-text")
              .transition(titleOpacityFadeOutDuration)
              .css("color", "rgba(255,255,255,0)"),
            prevSlideImage.transitionEnd(() => {
              activeSlideImage
                .transition(speed)
                .transform("translate3d(0, 0, 0) scale(" + imgScale + ")")/*,
              prevSlideImage
                .transition(speed)
                .transform("translate3d(${60 * p}%, 0, 0)  scale(" + imgScale + ")")*/;
            });
        },
        transitionEnd(elem) {
          const {
                slides: slides,
                activeIndex: activeIndex,
                $el: element
              } = elem,
            activeSlide = slides.eq(activeIndex),
            activeSlideImage = activeSlide.find("img");
  
          activeSlide.find(".fancy-slider-scale")
              .transition(slideScaleDuration)
              .transform("scale(1)"),
            activeSlideImage
              .transition(imageScaleDuration)
              .transform("scale(1)"),
            activeSlide
              .find(".fancy-slider-title-text")
              .transition(titleOpacityFadeInDuration)
              .css("color", "rgba(255,255,255,1)"),
            activeSlideImage.transitionEnd(() => {
                activeTransitionEnd = false;
              }),
            activeIndex === 0
              ? element
                  .find(".fancy-slider-button-prev")
                  .addClass("fancy-slider-button-disabled")
              : element
                  .find(".fancy-slider-button-prev")
                  .removeClass("fancy-slider-button-disabled"),
            activeIndex === slides.length - 1
              ? element
                  .find(".fancy-slider-button-next")
                  .addClass("fancy-slider-button-disabled")
              : element
                  .find(".fancy-slider-button-next")
                  .removeClass("fancy-slider-button-disabled");
        },
        init(elem) {
          const {
            slides: slides,
            activeIndex: activeIndex,
            $el: element
          } = elem;
          
          slideTransition(element);
          const activeSlideBgColor = slides.eq(activeIndex).attr("data-slide-bg-color");
          
          element.css("background-color", activeSlideBgColor),
            elem.emit("transitionEnd"),
            navButtonFn(elem);
        },
        resize(elem) {
          slideTransition(elem.$el);
        },
        destroy(elem) {
          disableButton(elem);
        },
      },
    });
  }
  
  const fancySlider = document.querySelector(".fancy-slider");
  initSwiper(fancySlider, {
    speed: 850, /* swiper speed; slide transition speed */
    slideScale: 0.6, /* after scale out slide - same as in css */
    imgScale: 1.2, /* after scale out img - same as in css */
    slideScaleDuration: 800, /* duration slide scale */
    imageScaleDuration: 750, /* duration image scale */
    titleOpacityFadeOutDuration: 800, /* duration title fade out */
    titleOpacityFadeInDuration: 800, /* duration title fade in */
  });
  