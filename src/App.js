import React, { useEffect, useState, useRef } from 'react';
import { FaCode, FaMobileAlt, FaPhone, FaEnvelope, FaBirthdayCake, FaGenderless, FaUserCheck, FaTools, FaPaintBrush, FaPencilAlt } from 'react-icons/fa';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'my-skills', label: 'My Skills' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];

// Typing animation component for the animated title
function AnimatedTyping({ texts, speed = 150, pause = 1500 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (index === texts.length) {
      setIndex(0);
      return;
    }

    if (subIndex === texts[index].length + 1 && !deleting) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setBlink(true);
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeoutRef.current);
  }, [subIndex, index, deleting, texts, speed, pause]);

  // Cursor blink timer
  useEffect(() => {
    const blinkTimeout = setInterval(() => {
      setBlink((v) => !v);
    }, 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <h1 className="mt-20 text-4xl md:text-6xl font-bold font-serif bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent select-none">
      {`${texts[index].substring(0, subIndex)}${blink ? '|' : ' '}`}
    </h1>
  );
}

function Navbar() {
  const [activeId, setActiveId] = useState('home');

  // Smooth scroll on link click
  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) {
          current = section.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // Set initially
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 bg-opacity-90 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-xl font-serif font-bold text-cyan-400 cursor-default select-none">
          Shakir Afghan
        </div>
        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleScroll(e, id)}
                className={`relative py-1 transition-colors duration-300 ${
                  activeId === id ? 'text-cyan-300' : 'hover:text-cyan-300'
                }`}
              >
                {label}
                {activeId === id && (
                  <span
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400 rounded"
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-950 to-blue-400 text-white overflow-hidden pt-16"
    >
      <div className="relative flex justify-center items-center">
        <div className="relative z-10 rounded-full overflow-hidden w-52 h-52 border-4 border-blue-400">
          <img
            src="/images/hero.jpg"
            alt="Shakir Afghan"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <DottedCircle
          size={230}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          dots={70}
          color="rgba(90, 232, 232, 0.678)"
        />
        <DottedCircle
          size={250}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-spin-fast-reverse"
          dots={80}
          color="rgba(90, 232, 232, 0.4)"
        />
        <DottedCircle
          size={280}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          dots={100}
          color="rgba(90, 232, 232, 0.3)"
        />
      </div>

      <AnimatedTyping texts={['Shakir Afghan']} />

      <p className="mt-8 max-w-xl text-center text-lg md:text-xl font-light tracking-wide animate-fade-in-delay">
        MERN Stack Developer | Graphic Designer | Web Developer | Creative Solutions
      </p>
    </section>
  );
}

function DottedCircle({ size, dots, color, className }) {
  const dotsArray = Array.from({ length: dots });
  const center = size / 2;
  const radius = size / 2 - 4;

  return (
    <svg className={className} width={size} height={size} style={{ overflow: 'visible' }}>
      {dotsArray.map((_, i) => {
        const angle = (360 / dots) * i;
        const rad = (angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="4" fill={color} />;
      })}
    </svg>
  );
}

function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center bg-blue-50 text-blue-900 px-6 md:px-20 py-28"
    >
      <h2 className="text-5xl font-extrabold mb-12 border-b-4 border-cyan-400 inline-block tracking-wide">
        About Me
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 items-center max-w-6xl mx-auto">
        <div className="rounded-s-full rounded-e-full  overflow-hidden shadow-2xl border border-cyan-300">
          <img
            src="/images/hero.jpg"
            alt="Shakir Afghan Profile"
            className="relative rounded-lg w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <DottedCircle
          size={230}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          dots={70}
          color="rgba(90, 232, 232, 0.678)"
        />
        <DottedCircle
          size={250}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-spin-fast-reverse"
          dots={80}
          color="rgba(90, 232, 232, 0.4)"
        />
        <DottedCircle
          size={280}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          dots={100}
          color="rgba(90, 232, 232, 0.3)"
        />
          
        </div>
        

        <div className="md:col-span-2 space-y-7 text-lg leading-relaxed font-sans">
          <p>
            Hi, I'm <span className="font-semibold text-cyan-600">Shakir Afghan</span>, a passionate MERN stack web developer and graphic designer committed to crafting creative, clean, and responsive web solutions.
          </p>
          <p>
            I specialize in building modern web applications using React, Node.js, MongoDB, and SQL, combined with compelling UI/UX designs crafted using Photoshop, Illustrator, Adobe XD, and Figma.
          </p>
          <p>
            My portfolio spans web development, graphic design, web designing, and pencil drawing — merging both technical mastery and artistic vision.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-blue-800 font-medium">
            <li className="flex items-center space-x-3">
              <FaPhone className="text-cyan-500 shrink-0" />
              <span>0775808106</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-cyan-500 shrink-0" />
              <a href="mailto:afghansa106@gmail.com" className="text-cyan-600 underline hover:text-cyan-700">
                afghansa106@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaBirthdayCake className="text-cyan-500 shrink-0" />
              <span>25 years old</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaGenderless className="text-cyan-500 shrink-0" />
              <span>Male</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaUserCheck className="text-cyan-500 shrink-0" />
              <span>Single</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaTools className="text-cyan-500 shrink-0" />
              <span>MERN Stack, Tailwind CSS, React, Node.js, HTML, CSS, JavaScript, MongoDB, SQL</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPaintBrush className="text-cyan-500 shrink-0" />
              <span>Photoshop, Illustrator, Adobe XD, Figma, WordPress</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPencilAlt className="text-cyan-500 shrink-0" />
              <span>Web Designing, Graphic Designing, Pencil Drawing</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function MySkills() {
  const skills = [
    { name: 'React.js', image: '/images/skills/react.png' },
    { name: 'Node.js', image: '/images/skills/node js.png' },
    { name: 'Express.js', image: '/images/skills/express.webp' },
    { name: 'MongoDB', image: '/images/skills/mongodb.png' },
    { name: 'Photoshop', image: '/images/skills/photoshop.png' },
    { name: 'Illustrator', image: '/images/skills/illustrator.png' },
    { name: 'Adobe XD', image: '/images/skills/adobexd.webp' },
    { name: 'Figma', image: '/images/skills/figma.webp' },
    { name: 'WordPress', image: '/images/skills/wordpres.png' },
    { name: 'Web Designing', image: '/images/skills/web design.png' },
    { name: 'Graphic Designing', image: '/images/skills/graphic design.webp' },
    { name: 'Pencil Drawing', image: '/images/skills/pecil-drawing.webp' },
  ];

  return (
    <section
      id="my-skills"
      className="min-h-screen bg-white px-6 md:px-20 py-24 text-blue-900"
    >
      <h2 className="text-4xl font-bold mb-12 border-b-4 border-cyan-400 inline-block">
        My Skills
      </h2>
      <p className="mb-12 max-w-3xl">
        These are some of the key skills and tools I use in my projects, combining technology and creativity.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {skills.map(({ name, image }) => (
          <div
            key={name}
            className="flex flex-col items-center space-y-3 p-6 rounded-lg shadow-lg bg-blue-50 hover:bg-cyan-50 transition-colors duration-300 ease-in-out cursor-pointer"
            title={name}
          >
            <img
              src={image}
              alt={name}
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
            <span className="text-lg font-semibold">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="services"
      className="min-h-screen bg-white px-6 md:px-20 py-24 text-blue-900"
    >
      <h2 className="text-4xl font-bold mb-12 border-b-4 border-cyan-400 inline-block">
        Services
      </h2>
      <div className="grid gap-12 md:grid-cols-3">
        <ServiceCard
          Icon={FaCode}
          title="Web Development"
          description="Full-stack MERN applications, scalable and maintainable code."
          points={['React.js', 'Node.js', 'Express', 'MongoDB']}
        />
        <ServiceCard
          Icon={FaPaintBrush}
          title="UI/UX Design"
          description="User-centered design with tools like Figma, Illustrator, and Photoshop."
          points={['Wireframing', 'Prototyping', 'User Research']}
        />
        <ServiceCard
          Icon={FaMobileAlt}
          title="Responsive Design"
          description="Mobile-first, adaptive layouts ensuring great user experience on all devices."
          points={['Mobile-first', 'Cross-browser', 'Performance optimized']}
        />
      </div>
    </section>
  );
}

function ServiceCard({ Icon, title, description, points }) {
  return (
    <div className="p-8 rounded-xl shadow-lg bg-blue-50 hover:bg-cyan-50 transition-colors duration-300 ease-in-out">
      <div className="w-16 h-16 bg-cyan-200 rounded-full flex justify-center items-center mb-6 text-cyan-600">
        <Icon size={32} />
      </div>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="mb-4">{description}</p>
      <ul className="list-disc list-inside space-y-2 text-blue-800">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function Portfolio() {
  return (
    <section
      id="portfolio"
      className="min-h-screen bg-blue-50 text-blue-900 px-6 md:px-20 py-24"
    >
      <h2 className="text-4xl font-bold mb-12 border-b-4 border-cyan-400 inline-block">Portfolio</h2>
      <p className="mb-8 max-w-3xl">
        Some recent projects showcasing my skills in full-stack web development and design.
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {/* Sample project cards */}
        {[
          {
            title: 'E-Commerce Platform',
            description: 'React, Node.js, MongoDB',
            image: '/images/ecommerce.png'
          },
          {
            title: 'Portfolio Website',
            description: 'HTML, CSS, JavaScript',
            image: '/images/portfolio.png'
          },
          {
            title: 'Analytics Dashboard',
            description: 'Vue.js, Chart.js, Express',
            image: '/images/dashboard.png'
          }
        ].map(({ title, description, image }, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transform hover:scale-105 transition-transform duration-300 fade-in"
            role="img"
            aria-label={title}
          >
            <img src={image} alt={title} className="w-full object-cover " />
            <div className="p-4">
              <h3 className="font-semibold text-xl mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-white px-6 md:px-20 py-24 text-blue-900"
    >
      <h2 className="text-4xl font-bold mb-12 border-b-4 border-cyan-400 inline-block">Contact</h2>
      <p className="mb-8 max-w-3xl">
        I am currently open to new opportunities and freelance projects. Feel free to get in touch!
      </p>
      <form
        className="max-w-xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert('Thanks for reaching out!');
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <textarea
          placeholder="Your Message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="submit"
          className="bg-cyan-500 text-white px-8 py-3 rounded font-semibold hover:bg-cyan-600 transition-colors"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

function App() {
  // Smooth scroll handled inside Navbar links
  // Fade-in on scroll effect for sections
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeEls.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => {
      fadeEls.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <MySkills />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-fast-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 24s linear infinite;
        }
        .animate-spin-fast-reverse {
          animation: spin-fast-reverse 14s linear infinite;
        }
        @keyframes fadeInTyping {
           0% { opacity: 0; transform: translateY(20px); }
           100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-typing {
          animation: fadeInTyping 2.5s ease forwards;
        }
        .animate-fade-in-delay {
          animation: fadeInTyping 3.5s ease forwards;
          animation-fill-mode: forwards;
          opacity: 0;
          animation-delay: 1.8s;
        }
      `}</style>
    </>
  );
}

export default App;
