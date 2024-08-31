import React, { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import data from '../data/data.json';
import sliderStyle  from './Slider.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  const [boxCount, setBoxCount] = useState(0);
  const sectionRefs = useRef([]);
  const appRef = useRef();
  const timelineRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = gsap.utils.toArray(`.${sliderStyle.section}`);
    setBoxCount(sections.length);

    // Initialize GSAP timeline
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: `.${sliderStyle.scrollingDiv}`,
        pin: true,
        scrub: 3, // Smooth scrubbing as the user scrolls
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.5, max: 0.8 },
          delay: 0.3,
          ease: "power1.inOut",
        },
        start: "top top", // Adjust start to delay animation
        end: () => `+=${window.innerWidth * sections.length}`,
        onUpdate: (self) => {
          setProgress(self.progress); // Update progress state
          toggleActiveClass(self.progress); // Toggle active class based on progress
        },
      },
    });

    // Animate the sections
    timelineRef.current.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
    });

    const toggleActiveClass = (progress) => {
      const progressPercentage = progress * 100;
      const sectionLength = sections.length;
      const step = 100 / (sectionLength - 1);

      sectionRefs.current.forEach((section, index) => {
        if (index === 0) {
          section.classList.toggle(`${sliderStyle.active}`, progressPercentage <= step / 2);
        } else if (index === sectionLength - 1) {
          section.classList.toggle(`${sliderStyle.active}`, progressPercentage >= step * (index - 0.5));
        } else {
          section.classList.toggle(`${sliderStyle.active}`, progressPercentage >= step * (index - 0.5) && progressPercentage <= step * (index + 0.5));
        }
      });
    };

    return () => {
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger.kill();
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={appRef}>
      <div className={sliderStyle.scrollingDiv}>
        <div className={sliderStyle.innerHeading}>Web Development Process</div>
        <div className={sliderStyle.info} >
          <div className={sliderStyle.controls}>
            <div className={sliderStyle.progressBar} >
              <div
                className={sliderStyle.progressHead} 
                style={{ width: `clamp(0%, ${progress * 100}%, 100%)` }} // Using clamp for dynamic width
              ></div>
              {Array.from({ length: boxCount }).map((_, index) => (
                <div
                  key={index}
                  className={sliderStyle.progressPoint}
                  style={{
                    left: `${(index / (boxCount - 1)) * 100}%`,
                    backgroundColor:
                      progress >= index / (boxCount - 1) ? "#00a6a6" : "#ebf2fa",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className={sliderStyle.wrapper} >
          {data.map((step, index) => (
            <section
              key={index}
              className={sliderStyle.section} 
              ref={(el) => (sectionRefs.current[index] = el)}>
              <div className={sliderStyle.headLogo}>
                <h3>{step.title}</h3>
                <img src={step.smallImage} width="60" alt={step.title} />
              </div>

              <p>{step.description}</p>
              
              <a href={step.knowMore}>Know More</a>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;