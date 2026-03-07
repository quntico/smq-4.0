
import React from 'react';
import { motion } from 'framer-motion';

const industries = [
  {
    id: 1,
    title: 'Reciclaje',
    description: 'Plantas de reciclaje de plásticos',
    image: 'https://images.unsplash.com/photo-1680214734782-48962f9c17eb'
  },
  {
    id: 2,
    title: 'Alimentos',
    description: 'Líneas de procesamiento alimentario',
    image: 'https://images.unsplash.com/photo-1535474035682-b50c07c2418f'
  },
  {
    id: 3,
    title: 'Packaging',
    description: 'Sistemas de llenado y envasado',
    image: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520'
  },
  {
    id: 4,
    title: 'Construcción',
    description: 'Materiales compuestos y reciclados',
    image: 'https://images.unsplash.com/photo-1576798815951-7c3ff46cf5f5'
  },
  {
    id: 5,
    title: 'Automatización',
    description: 'Sistemas inteligentes de control',
    image: 'https://images.unsplash.com/photo-1679986944940-c5001ec1c1da'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const IndustriesSection = () => {
  return (
    <section className="bg-[#0B0F14] px-[20px] py-[40px] md:px-[30px] md:py-[60px] lg:px-[40px] lg:py-[80px] w-full">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-[#FFFFFF] font-[700] text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[60px]"
        >
          Sectores Industriales
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[24px]"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={itemVariants}
              className="group relative h-[200px] md:h-[250px] lg:h-[300px] rounded-[12px] overflow-hidden cursor-pointer shadow-lg border-l-[4px] border-transparent hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-250 ease-in-out"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-250 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${industry.image})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] transition-colors duration-250 ease-in-out group-hover:bg-[rgba(0,0,0,0.3)]" />

              {/* Content */}
              <div className="absolute inset-0 p-[30px] flex flex-col justify-end items-start z-10">
                <h3 className="text-[#FFFFFF] font-[700] text-[18px] md:text-[22px] lg:text-[28px] mb-[8px] transition-colors duration-250 ease-in-out group-hover:text-[#FFD700]">
                  {industry.title}
                </h3>
                <p className="text-[#D0D0D0] font-[400] text-[11px] md:text-[12px] lg:text-[14px] opacity-80 transition-opacity duration-250 ease-in-out group-hover:opacity-100">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
