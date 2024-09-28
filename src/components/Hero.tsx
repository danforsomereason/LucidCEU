import React from 'react';
import '../styles/Hero.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Hero: React.FC = () => {
  return (
  <section className="hero-section">
    <Typography variant="h1" gutterBottom>
      LEARN, GROW, IMPACT
    </Typography>
    <Typography variant="h2" gutterBottom>
      <span>Impact your client work, faster.</span><br />
      <span>Stay up-to-date and compliant.</span>
    </Typography>
    <Typography variant="body1" gutterBottom>
      LUCID makes training your team simple. Easily register your employees to start learning and accruing Continuing Education Units toward their licensure requirements. LUCID stays up to date on leading research, state guidelines, and accreditation standards so that you can focus on what you do best: providing exceptional client care!
    </Typography>
    <Button variant="contained" color="secondary">
      Get Started
    </Button>
  </section>
  );
};

export default Hero;