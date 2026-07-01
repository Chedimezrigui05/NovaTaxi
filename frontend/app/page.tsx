'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { Heading, SectionTitle, Subheading } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Navbar } from '@/components/ui/navbar';
import { Textarea } from '@/components/ui/textarea';
import { Motion } from '@/lib/motion';
import { useState } from 'react';
import {
  MapPin,
  Clock,
  Shield,
  Users,
  Zap,
  TrendingUp,
  Star,
  ChevronDown,
  Download,
  Apple,
  Play,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <Motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge className="w-fit bg-yellow-400/20 text-yellow-600">
              ✨ The Future of Urban Mobility
            </Badge>

            <h1 className="text-5xl font-bold leading-tight text-white lg:text-7xl">
              Your Ride, Reimagined
            </h1>

            <p className="text-lg text-slate-300">
              Experience premium urban transportation with cutting-edge technology, professional drivers, and unmatched safety standards.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="bg-yellow-400 px-8 py-3 hover:bg-yellow-500 text-slate-950 font-semibold">
                Book Now
              </Button>
              <Button variant="secondary" className="border-slate-600 text-white hover:bg-slate-800">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div>
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-sm text-slate-400">Active Riders</p>
              </div>
              <div className="h-12 w-px bg-slate-600" />
              <div>
                <p className="text-2xl font-bold text-white">4.9★</p>
                <p className="text-sm text-slate-400">Rating</p>
              </div>
            </div>
          </Motion.div>

          {/* Right visual */}
          <Motion.div
            className="relative h-96 lg:h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 p-1"
              animate={{ rotate: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="h-full w-full rounded-3xl bg-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-yellow-400 mx-auto" />
                  <p className="text-white font-semibold">Ready for your next ride</p>
                </div>
              </div>
            </motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'AI-powered safety monitoring and verified professional drivers',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get matched with a driver in under 30 seconds',
    },
    {
      icon: Clock,
      title: 'Schedule Ahead',
      description: 'Book rides up to 30 days in advance',
    },
    {
      icon: Users,
      title: 'Group Rides',
      description: 'Share rides with friends and save up to 40%',
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Why Choose NovaTaxi</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">
            Features designed for your convenience
          </p>
        </Motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="group h-full space-y-4 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10">
                  <div className="inline-block rounded-2xl bg-yellow-50 p-3 transition-colors group-hover:bg-yellow-100">
                    <Icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Open App',
      description: 'Launch NovaTaxi and set your destination',
    },
    {
      number: '02',
      title: 'Confirm Details',
      description: 'Review fare estimate and confirm booking',
    },
    {
      number: '03',
      title: 'Get Matched',
      description: 'Connected with your driver instantly',
    },
    {
      number: '04',
      title: 'Enjoy Ride',
      description: 'Sit back and reach your destination safely',
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>How It Works</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">
            Get from A to B in 4 simple steps
          </p>
        </Motion.div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <Motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="absolute -right-4 top-8 hidden h-1 w-8 bg-yellow-200 lg:block" />
              )}

              <Card className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-slate-950">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </Card>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Statistics Section
function StatisticsSection() {
  const stats = [
    { value: '10M+', label: 'Rides Completed' },
    { value: '2.5M', label: 'Active Users' },
    { value: '15+', label: 'Cities' },
    { value: '$500M', label: 'Fares Earned' },
  ];

  return (
    <section className="bg-slate-950 py-20 lg:py-32 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              variants={itemVariants}
            >
              <motion.p
                className="text-4xl font-bold text-yellow-400 lg:text-5xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Anderson',
      role: 'CEO, Tech Startup',
      content: 'NovaTaxi has completely changed how I commute. Fast, reliable, and professional!',
      rating: 5,
    },
    {
      name: 'Mike Johnson',
      role: 'Business Consultant',
      content: 'Best ride-sharing experience I\'ve had. The driver was courteous and the app is intuitive.',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      role: 'Travel Blogger',
      content: 'Perfect for traveling between cities. Always on time and great value for money.',
      rating: 5,
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>What Our Riders Say</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">
            Join thousands of happy customers
          </p>
        </Motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full space-y-4 p-6">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700">{testimonial.content}</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-950">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer:
        'Open the NovaTaxi app, enter your destination, select your ride type, and confirm. A driver will be matched with you in seconds.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, digital wallets, and bank transfers. You can also pay cash on select routes.',
    },
    {
      question: 'Are your drivers verified?',
      answer:
        'Yes, all our drivers undergo rigorous background checks, vehicle inspections, and training programs to ensure your safety.',
    },
    {
      question: 'Can I cancel my ride?',
      answer:
        'You can cancel free of charge up to 5 minutes before pickup. After that, a small cancellation fee may apply.',
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <Motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Frequently Asked Questions</SectionTitle>
        </Motion.div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-yellow-300 hover:shadow-md"
              >
                <span className="font-semibold text-slate-950">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFAQ === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFAQ === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-l-2 border-yellow-500 bg-yellow-50 p-4"
                  >
                    <p className="text-slate-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Download App Section
function DownloadAppSection() {
  return (
    <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20 lg:py-32 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <Motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold lg:text-5xl">
              Download the App Today
            </h2>
            <p className="text-lg text-yellow-100">
              Get exclusive app-only deals and book your rides on the go. Available on iOS and Android.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex items-center justify-center gap-2 bg-white px-6 py-3 text-yellow-600 hover:bg-slate-100">
                <Apple className="h-5 w-5" />
                App Store
              </Button>
              <Button className="flex items-center justify-center gap-2 border-slate-950 bg-transparent px-6 py-3 text-slate-950 hover:bg-white/20">
                <Play className="h-5 w-5" />
                Google Play
              </Button>
            </div>
          </Motion.div>

          {/* Visual */}
          <Motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="rounded-3xl bg-white p-2 shadow-2xl">
                <div className="h-96 w-52 rounded-3xl bg-gradient-to-b from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <p className="text-slate-950 text-center font-semibold">
                    Download App
                  </p>
                </div>
              </div>
            </motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <Motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <SectionTitle>Get in Touch</SectionTitle>
              <p className="mt-4 text-lg text-slate-600">
                Have questions? Our support team is here to help 24/7.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <Phone className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Phone</p>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <Mail className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Email</p>
                  <p className="text-slate-600">support@novataxi.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Live Chat</p>
                  <p className="text-slate-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </Motion.div>

          {/* Right - Form */}
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="space-y-6 p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-950 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-50 text-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatisticsSection />
        <TestimonialsSection />
        <FAQSection />
        <DownloadAppSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
