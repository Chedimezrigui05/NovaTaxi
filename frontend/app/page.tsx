'use client';

import { AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { SectionTitle } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/ui/navbar';
import { Textarea } from '@/components/ui/textarea';
import { Motion } from '@/lib/motion';
import { useState } from 'react';
import { Shield, Zap, Clock, Users, ChevronDown, Apple, Play, Mail, Phone, MessageSquare, Star } from 'lucide-react';

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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// Hero Section
function HeroSection() {
  return (
    <section className="bg-noise relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(240,180,41,0.22),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(201,147,47,0.16),_transparent_30%)]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="space-y-8">
            <Badge className="w-fit border-none bg-gradient-to-r from-brand-400/25 via-brand-300/20 to-gilt-500/25 text-brand-200 ring-1 ring-brand-400/30">
              NOUVEAU • NovaTaxi Confort
            </Badge>
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-5xl font-bold tracking-tight leading-tight lg:text-6xl">
                <span className="text-gradient-gold">Voyagez plus vite et plus sereinement en Tunisie.</span>
              </h1>
              <p className="text-xl leading-8 text-black">
                NovaTaxi vous offre une expérience ride fiable et sécurisée à chaque déplacement.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="px-8 py-3 text-base">
                Réserver un trajet
              </Button>
              <Button variant="secondary" className="border-brand-400/40 bg-gradient-to-r from-brand-400/20 to-gilt-500/20 text-brand-100 hover:bg-brand-400/30">
                Découvrir l’app
              </Button>
            </div>
          </Motion.div>

          <Motion.div initial="hidden" animate="visible" variants={fadeInVariants} className="relative mx-auto max-w-xl">
            <div className="gold-ring group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
              <div className="absolute -right-10 -top-10 h-36 w-36 animate-glow-pulse rounded-full bg-brand-400/25 blur-3xl" />
              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-gilt-500/15 blur-3xl" />
              <div className="relative space-y-8">
                <div className="rounded-[2rem] border border-white/5 bg-slate-900 p-8 text-white shadow-xl shadow-slate-950/30">
                  <p className="text-sm uppercase tracking-[0.28em] text-gradient-gold">Confort</p>
                  <h2 className="mt-4 text-3xl font-bold">Voyage express</h2>
                  <p className="mt-4 text-slate-300">Prenez la route avec un chauffeur proche et un service instantané.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['24/7', 'Trajets instantanés', 'Chauffeurs vérifiés', 'Taux 98%'].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-2 text-sm font-medium text-brand-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/5">
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Arrivée</p>
                    <p className="mt-3 text-lg font-semibold">5 min</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/5">
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Note</p>
                    <p className="mt-3 text-lg font-semibold">4.9/5</p>
                  </div>
                </div>
              </div>
            </div>
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
      title: 'Sécurité',
      description: 'Surveillance de sécurité intelligente et chauffeurs professionnels vérifiés',
    },
    {
      icon: Zap,
      title: 'Ultra rapide',
      description: 'Un chauffeur vous est attribué en moins de 30 secondes',
    },
    {
      icon: Clock,
      title: 'Planification',
      description: 'Réservez vos trajets jusqu’à 30 jours à l’avance',
    },
    {
      icon: Users,
      title: 'Trajets partagés',
      description: 'Partagez vos trajets et économisez jusqu’à 40%',
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Pourquoi choisir NovaTaxi</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">
            Des fonctionnalités pensées pour votre confort
          </p>
        </Motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Motion.div key={idx} variants={itemVariants}>
                <Card className="group h-full space-y-4 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-brand-400/10">
                  <div className="inline-block rounded-2xl bg-brand-50 p-3 transition-colors group-hover:bg-brand-100">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </Card>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Ouvrez l’app',
      description: 'Lancez NovaTaxi et indiquez votre destination',
    },
    {
      number: '02',
      title: 'Confirmez les détails',
      description: 'Vérifiez le tarif et confirmez votre course',
    },
    {
      number: '03',
      title: 'Obtenez un chauffeur',
      description: 'Un chauffeur est assigné en quelques secondes',
    },
    {
      number: '04',
      title: 'Profitez du trajet',
      description: 'Détendez-vous et arrivez en toute sécurité',
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
          <SectionTitle>Comment ça marche</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">Allez de A à B en 4 étapes simples</p>
        </Motion.div>

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
              {idx < steps.length - 1 && (
                <div className="absolute -right-4 top-8 hidden h-1 w-8 bg-brand-200 lg:block" />
              )}

              <Card className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-400 text-lg font-bold text-slate-950">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </Card>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Anderson',
      role: 'Fondatrice',
      content: 'NovaTaxi a complètement changé ma façon de voyager. Rapide, fiable et professionnel !',
      rating: 5,
    },
    {
      name: 'Mike Johnson',
      role: 'Consultant',
      content: 'La meilleure expérience de transport que j’ai eue. Le chauffeur était courtois et l’application est intuitive.',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      role: 'Blogueuse voyage',
      content: 'Parfait pour voyager entre les villes. Toujours à l’heure et très bon rapport qualité-prix.',
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
          <SectionTitle>Ce que disent nos passagers</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">Rejoignez des milliers de clients satisfaits</p>
        </Motion.div>

        <Motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <Motion.div key={idx} variants={itemVariants}>
              <Card className="h-full space-y-4 p-6">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-slate-700">{testimonial.content}</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-950">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </Card>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: 'Comment réserver un trajet ?',
      answer:
        'Ouvrez l’application NovaTaxi, indiquez votre destination, choisissez votre type de course et confirmez. Un chauffeur vous sera attribué en quelques secondes.',
    },
    {
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer:
        'Nous acceptons les principales cartes bancaires, portefeuilles numériques et virements. Le paiement en espèces est également possible sur certaines routes.',
    },
    {
      question: 'Vos chauffeurs sont-ils vérifiés ?',
      answer:
        'Oui, tous nos chauffeurs passent des vérifications strictes, des contrôles de véhicule et des formations pour garantir votre sécurité.',
    },
    {
      question: 'Puis-je annuler ma course ?',
      answer:
        'Vous pouvez annuler sans frais jusqu’à 5 minutes avant la prise en charge. Après cela, des frais d’annulation peuvent s’appliquer.',
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Questions fréquemment posées</SectionTitle>
          <p className="mt-4 text-xl text-slate-600">Découvrez les réponses aux questions les plus courantes</p>
        </Motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-brand-300 hover:shadow-md"
              >
                <span className="font-semibold text-slate-950">{faq.question}</span>
                <Motion.div animate={{ rotate: openFAQ === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                </Motion.div>
              </button>

              <AnimatePresence>
                {openFAQ === idx && (
                  <Motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-l-2 border-brand-500 bg-brand-50 p-4"
                  >
                    <p className="text-slate-700">{faq.answer}</p>
                  </Motion.div>
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
    <section className="bg-gradient-to-r from-brand-400 to-brand-500 py-20 lg:py-32 text-slate-950">
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
              Téléchargez l’application aujourd’hui
            </h2>
            <p className="text-lg text-brand-100">
              Profitez d’offres exclusives et réservez vos trajets en mobilité. Disponible sur iOS et Android.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex items-center justify-center gap-2 bg-white px-6 py-3 text-brand-600 hover:bg-slate-100">
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
            <Motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="rounded-3xl bg-white p-2 shadow-2xl">
                <div className="h-96 w-52 rounded-3xl bg-gradient-to-b from-brand-400 to-brand-500 flex items-center justify-center">
                  <p className="text-slate-950 text-center font-semibold">
                    Download App
                  </p>
                </div>
              </div>
            </Motion.div>
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
              <SectionTitle>Contactez-nous</SectionTitle>
              <p className="mt-4 text-lg text-slate-600">
                Des questions ? Notre équipe de support est disponible 24h/24.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100">
                  <Phone className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Phone</p>
                  <p className="text-slate-600">+216 12 345 678</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100">
                  <Mail className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Email</p>
                  <p className="text-slate-600">chedimezrigui05@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100">
                  <MessageSquare className="h-6 w-6 text-brand-600" />
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
                    Nom
                  </label>
                  <Input
                    type="text"
                    placeholder="Votre nom"
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
                    placeholder="votre@email.com"
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
                    placeholder="Écrivez votre message ici..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-400 hover:bg-brand-500 text-slate-950 font-semibold"
                >
                  Envoyer
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
    <div className="min-h-screen bg-brand-50 text-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <DownloadAppSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
