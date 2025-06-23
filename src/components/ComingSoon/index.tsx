import { motion } from 'framer-motion';
import Navbar from '../Navbar';

const ComingSoon = () => {
  return (
    <>
    <Navbar />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <motion.h1
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ fontSize: '4rem', marginBottom: '1rem' }}
      >
        Coming Soon
      </motion.h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '600px' }}>
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </motion.div>
    </>
    
  );
};

export default ComingSoon;