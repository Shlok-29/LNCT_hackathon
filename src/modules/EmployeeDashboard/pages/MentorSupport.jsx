import React from 'react';
import { motion } from 'framer-motion';

const EmployeeMentorSupport = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-8 text-center'>
    <h1 className='text-3xl font-bold mb-4'>MentorSupport</h1>
    <p className='text-emerald-400/60'>Staff access module for MentorSupport. Internal use only.</p>
  </motion.div>
);

export default EmployeeMentorSupport;
