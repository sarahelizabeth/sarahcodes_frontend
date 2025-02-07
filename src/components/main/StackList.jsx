import React from 'react';
import {
  FaAws,
  FaBootstrap,
  FaDocker,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaMailchimp,
  FaNode,
  FaPython,
  FaReact,
  FaSass,
  FaStripeS,
  FaVuejs,
} from 'react-icons/fa';
import { MdOutlineAutoAwesomeMotion } from 'react-icons/md';
import { PiDotsThreeCircleVerticalBold } from 'react-icons/pi';
import { RiFirebaseLine } from 'react-icons/ri';
import {
  SiAmazons3,
  SiAxios,
  SiAwslambda,
  SiBulma,
  SiCelery,
  SiClerk,
  SiD3Dotjs,
  SiExpo,
  SiFlask,
  SiGatsby,
  SiGraphql,
  SiDjango,
  SiTailwindcss,
  SiNextdotjs,
  SiNuxtdotjs,
  SiRedis,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { DiPostgresql } from 'react-icons/di';
import { TbBrandReactNative } from 'react-icons/tb';
import { IconTooltip } from '../ui/IconTooltip';

const stackList = [
  { type: 'react', label: 'React', icon: <FaReact />, size: 35, show: true },
  { type: 'vue', label: 'Vue.js', icon: <FaVuejs />, size: 35, show: true },
  { type: 'django', label: 'Django', icon: <SiDjango />, size: 35, show: true },
  { type: 'postgres', label: 'PostgreSQL', icon: <DiPostgresql />, size: 35, show: true },
  { type: 'typescript', label: 'TypeScript', icon: <SiTypescript />, size: 32, show: true },
  { type: 'python', label: 'Python', icon: <FaPython />, size: 35, show: true },
  { type: 'html', label: 'HTML', icon: <FaHtml5 />, size: 35, show: true },
  { type: 'sass', label: 'Sass', icon: <FaSass />, size: 35, show: true },
  { type: 'tailwind', label: 'TailwindCSS', icon: <SiTailwindcss />, size: 35, show: true },
  { type: 'aws', label: 'AWS', icon: <FaAws />, size: 38, show: true },
  { type: 'docker', label: 'Docker', icon: <FaDocker />, size: 35, show: true },
  { type: 'git', label: 'Github', icon: <FaGithub />, size: 35, show: true },
  { type: 'next', label: 'Next.js', icon: <SiNextdotjs />, size: 35, show: true },
  { type: 'node', label: 'Node.js', icon: <FaNode />, size: 35, show: true },
  { type: 'vite', label: 'Vite', icon: <SiVite />, size: 35, show: true },
  { type: 'axios', label: 'Axios', icon: <SiAxios />, size: 35, show: true },
  { type: 'bulma', label: 'Bulma', icon: <SiBulma />, size: 35, show: false },
  { type: 'celery', label: 'Celery', icon: <SiCelery />, size: 35, show: true },
  { type: 'd3', label: 'D3.js', icon: <SiD3Dotjs />, size: 35, show: false },
  { type: 'gatsby', label: 'Gatsby', icon: <SiGatsby />, size: 35, show: true },
  { type: 'redis', label: 'Redis', icon: <SiRedis />, size: 35, show: true },
  { type: 'native', label: 'React Native', icon: <TbBrandReactNative />, size: 35, show: true },
  { type: 's3', label: 'AWS S3', icon: <SiAmazons3 />, size: 35, show: false },
  { type: 'nuxt', label: 'Nuxt', icon: <SiNuxtdotjs />, size: 35, show: true },
  { type: 'graphql', label: 'GraphQL', icon: <SiGraphql />, size: 35, show: true },
  { type: 'lambda', label: 'AWS Lambda', icon: <SiAwslambda />, size: 35, show: true },
  { type: 'expo', label: 'Expo', icon: <SiExpo />, size: 35, show: false },
  { type: 'figma', label: 'Figma', icon: <FaFigma />, size: 35, show: true },
  { type: 'reanimated', label: 'Reanimated', icon: <MdOutlineAutoAwesomeMotion />, size: 35, show: false },
  { type: 'clerk', label: 'Clerk', icon: <SiClerk />, size: 35, show: false },
  { type: 'firebase', label: 'Firebase', icon: <RiFirebaseLine />, size: 35, show: true },
  { type: 'drf', label: 'Django REST Framework', icon: <PiDotsThreeCircleVerticalBold />, size: 35, show: false },
  { type: 'nativewind', label: 'NativeWind', icon: <SiTailwindcss />, size: 35, show: false },
  { type: 'bootstrap', label: 'Bootstrap', icon: <FaBootstrap />, size: 35, show: false },
  { type: 'mailchimp', label: 'MailChimp', icon: <FaMailchimp />, size: 35, show: false },
  { type: 'stripe', label: 'Stripe', icon: <FaStripeS />, size: 35, show: false },
  { type: 'flask', label: 'Flask', icon: <SiFlask />, size: 35, show: false },
];

// Function to get an item by label
export const getStackItemByLabel = (label) => {
  return stackList.find(item => item.label.toLowerCase() === label.toLowerCase());
};

const StackList = ({ size }) => {
  return (
    <div className='stack-grid grid grid-cols-5 w-full gap-2'>
      {stackList.map((stack) => (
        stack.show && (
          <IconTooltip key={stack.type} placement='top' text={stack.label} icon={React.cloneElement(stack.icon, { size: size || stack.size })} />
        )
      ))}
    </div>
  );
};

export default StackList; 