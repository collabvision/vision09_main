"use client";
import { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const FooterAlt = () => {
  const [mounted, setMounted] = useState(false);
  const elementsRef = useRef([]);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/thevision9.co', label: 'Instagram', color: '#E4405F' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=61576259486894', label: 'Facebook', color: '#1877F2' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/the-vision9/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: FaWhatsapp, href: 'https://wa.me/918147637913', label: 'WhatsApp', color: '#25D366' },
    { icon: FaEnvelope, href: 'mailto:business@vision9.com', label: 'Email', color: '#EA4335' }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .footer-alt {
          background: linear-gradient(
            135deg,
            var(--bg, #FAF8F2) 0%,
            var(--bg-alt, #F2EDE0) 100%
          );
          border-top: 1px solid transparent;
          border-image: linear-gradient(
            90deg,
            var(--lime, #C4F135),
            var(--accent, #A8832A),
            var(--lime, #C4F135)
          );
          border-image-slice: 1;
          position: relative;
          overflow: hidden;
        }

        .footer-alt::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(196, 241, 53, 0.03),
            transparent
          );
          animation: shimmer 8s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          20% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        .social-icon-alt {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--black, #080808);
          color: white;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          transform: scale(0.8);
        }

        .social-icon-alt.visible {
          opacity: 1;
          transform: scale(1);
        }

        .social-icon-alt:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .service-chip {
          padding: 0.5rem 1.2rem;
          background: rgba(168, 131, 42, 0.05);
          border: 1px solid var(--border, rgba(168,131,42,0.20));
          border-radius: 30px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          color: var(--text-sec, #56503E);
          transition: all 0.3s ease;
          cursor: default;
          white-space: nowrap;
        }

        .service-chip:hover {
          background: var(--lime, #C4F135);
          color: var(--black, #080808);
          border-color: var(--lime, #C4F135);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(196, 241, 53, 0.3);
        }

        .footer-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .footer-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
      `}</style>

      <footer className="footer-alt" style={{ padding: '2rem 0 1.5rem' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Main Content */}
          <div className="flex flex-col items-center gap-6">
            
            {/* Services Row */}
            <div 
              ref={addToRefs}
              className="footer-reveal delay-1 flex flex-wrap justify-center gap-3"
            >
              {['Performance Marketing', 'Branding & Design', 'UGC & Content'].map((service, i) => (
                <span key={i} className="service-chip">
                  {service}
                </span>
              ))}
            </div>

            {/* Social Icons Row */}
            <div 
              ref={addToRefs}
              className="footer-reveal delay-2 flex flex-wrap justify-center gap-3"
            >
              {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="social-icon-alt"
                  style={{
                    transitionDelay: mounted ? `${0.3 + index * 0.1}s` : '0s'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Copyright Row */}
            <div 
              ref={addToRefs}
              className="footer-reveal delay-3 text-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                color: 'var(--text-sec, #56503E)',
                borderTop: '1px solid var(--border, rgba(168,131,42,0.20))',
                paddingTop: '1.5rem',
                width: '100%'
              }}
            >
              <span>
                © {new Date().getFullYear()}{' '}
                <span style={{ 
                  color: 'var(--accent, #A8832A)',
                  fontWeight: 600,
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.05em'
                }}>
                  VISION9
                </span>
                {' '}Marketing Studio. All rights reserved.
              </span>
            </div>
          </div>

          {/* Floating "9" watermark */}
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '1rem',
            fontSize: '8rem',
            fontWeight: 900,
            fontFamily: "'Bebas Neue', sans-serif",
            color: 'rgba(168,131,42,0.03)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0
          }}>
            9
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterAlt;