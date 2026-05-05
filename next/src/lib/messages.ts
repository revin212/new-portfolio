export type Locale = "id" | "en";

export const defaultLocale: Locale = "id";

/** Query string key for locale override, e.g. `?lang=en`. See README.md. */
export const LOCALE_QUERY_PARAM = "lang";

export function isLocale(value: string): value is Locale {
  return value === "id" || value === "en";
}

export type ProcessStep = {
  title: string;
  description: string;
  ctaLabel?: string;
};

export type ServiceItem = {
  title: string;
  examples: string;
};

export type MessageBundle = {
  nav: Record<string, string>;
  navUi: {
    openMenu: string;
    closeMenu: string;
    menuTitle: string;
    menuSubtitle: string;
    language: string;
    langId: string;
    langEn: string;
  };
  hero: {
    badge: string;
    hi: string;
    cta: string;
    taglineDefault: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    scrollHint: string;
    live: string;
    repo: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    roleTitle: string;
    roleBody: string;
    period: string;
  };
  techStack: {
    eyebrow: string;
    title: string;
    intro: string;
    frontend: string;
    backend: string;
    tools: string;
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  contact: {
    eyebrow: string;
    headlineLine1: string;
    headlineAccent: string;
    headlineLine2: string;
    intro: string;
    responseTitle: string;
    responseLead: string;
    responseHours: string;
    responseTrail: string;
    labelName: string;
    labelEmail: string;
    labelEmailHint: string;
    labelWhatsapp: string;
    labelWhatsappHint: string;
    placeholderWhatsapp: string;
    labelMessage: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderMessage: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successHint: string;
    errorRetry: string;
    errorGeneric: string;
  };
};

export const messages: Record<Locale, MessageBundle> = {
  en: {
    nav: {
      hero: "Home",
      education: "Education",
      experience: "Experience",
      projects: "Projects",
      techStack: "Tech Stack",
      services: "Website types",
      process: "Order flow",
      contact: "Contact",
      footer: "Footer",
    },
    navUi: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuTitle: "Menu",
      menuSubtitle: "Navigate sections",
      language: "Language",
      langId: "ID",
      langEn: "EN",
    },
    hero: {
      badge: "Available for new opportunities",
      hi: "Hi, I'm",
      cta: "Work With Me",
      taglineDefault:
        "A dedicated Software Developer building modern web apps from UI to backend with precision and clean code architecture.",
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Selected Works",
      scrollHint: "Scroll to explore",
      live: "Live",
      repo: "Repo",
    },
    experience: {
      eyebrow: "Career Path",
      title: "Professional Experience",
      roleTitle: "Software Developer — PT Heksa Solution Insurance",
      roleBody:
        "Developing enterprise-grade insurance solutions with a focus on robust backend architectures and highly responsive user interfaces.",
      period: "Jul 2024 — Present",
    },
    techStack: {
      eyebrow: "Core Competencies",
      title: "Technical Arsenal",
      intro:
        "A curated selection of technologies I use to build robust, scalable products from the ground up.",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & Infrastructure",
    },
    process: {
      eyebrow: "Freelance",
      title: "Project order flow",
      subtitle:
        "A concise path from first contact to a live website—transparent at every step.",
      steps: [
        {
          title: "Contact me",
          description:
            "Start with a short message via the contact form or other channels. Share a high-level idea of your project.",
          ctaLabel: "Open contact",
        },
        {
          title: "Project discussion",
          description:
            "We align on requirements, pricing, and estimated timeline so expectations match from day one.",
        },
        {
          title: "Down payment",
          description:
            "After we agree, the deposit secures your slot and kicks off development.",
        },
        {
          title: "Development",
          description:
            "Implementation, integrations, and polish per the agreed scope—with progress updates when helpful.",
        },
        {
          title: "Review",
          description:
            "Demo or preview for your review; reasonable revisions follow what we agreed upfront.",
        },
        {
          title: "Final payment",
          description:
            "Once you approve the result, the balance is settled before go-live.",
        },
        {
          title: "Deploy",
          description:
            "The site goes to hosting/production and is handed over with what you need to operate it.",
        },
      ],
    },
    services: {
      eyebrow: "Freelance",
      title: "Website types you can order",
      subtitle:
        "An overview of what I can help build—scope and features are refined during the project discussion.",
      items: [
        {
          title: "Landing pages",
          examples:
            "Company, school, SME, organization, and similar landing sites.",
        },
        {
          title: "Invitation websites",
          examples:
            "Weddings, circumcision ceremonies, birthdays, and other events.",
        },
        {
          title: "Information management",
          examples: "Schools, hospitals, organizations, and similar needs.",
        },
        {
          title: "Booking systems",
          examples:
            "Futsal, basketball, padel courts, barbershops, salons, and more.",
        },
        {
          title: "Sales & inventory",
          examples: "Sales flows, stock, and store or warehouse operations.",
        },
        {
          title: "E-commerce",
          examples: "Online store with catalog, cart, and checkout.",
        },
        {
          title: "Custom & more",
          examples: "Tailored web solutions based on your goals.",
        },
      ],
    },
    contact: {
      eyebrow: "Get in touch",
      headlineLine1: "Let's build something",
      headlineAccent: "extraordinary",
      headlineLine2: "together.",
      intro:
        "I'm open to freelance projects and technical collaborations. Send a message and let's start the conversation.",
      responseTitle: "Response time",
      responseLead: "Typically within ",
      responseHours: "24 hours",
      responseTrail:
        ". Include context and a preferred timeline.",
      labelName: "Name",
      labelEmail: "Email",
      labelEmailHint: "I'll reply to this address.",
      labelWhatsapp: "WhatsApp (optional)",
      labelWhatsappHint: "If provided, I may reach out on WhatsApp for quicker follow-up.",
      placeholderWhatsapp: "+62 812 3456 7890",
      labelMessage: "Message",
      placeholderName: "John Doe",
      placeholderEmail: "john@example.com",
      placeholderMessage: "Tell me about your project...",
      submit: "Send Message",
      submitting: "Sending...",
      successTitle: "Thanks — your message was sent.",
      successHint: "I'll reply to your email as soon as possible.",
      errorRetry: "Please try again in a moment.",
      errorGeneric: "Failed to send message.",
    },
  },
  id: {
    nav: {
      hero: "Beranda",
      education: "Pendidikan",
      experience: "Pengalaman",
      projects: "Proyek",
      techStack: "Tech Stack",
      services: "Tipe website",
      process: "Alur pemesanan",
      contact: "Kontak",
      footer: "Footer",
    },
    navUi: {
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      menuTitle: "Menu",
      menuSubtitle: "Pilih bagian",
      language: "Bahasa",
      langId: "ID",
      langEn: "EN",
    },
    hero: {
      badge: "Terbuka untuk peluang baru",
      hi: "Halo, saya",
      cta: "Kerja bersama saya",
      taglineDefault:
        "Software Developer yang fokus membangun aplikasi web modern dari UI hingga backend dengan arsitektur yang rapi.",
    },
    projects: {
      eyebrow: "Portofolio",
      title: "Karya pilihan",
      scrollHint: "Gulir untuk melihat",
      live: "Live",
      repo: "Repo",
    },
    experience: {
      eyebrow: "Perjalanan karier",
      title: "Pengalaman profesional",
      roleTitle: "Software Developer — PT Heksa Solution Insurance",
      roleBody:
        "Mengembangkan solusi asuransi tingkat perusahaan dengan fokus pada backend yang kokoh dan antarmuka yang responsif.",
      period: "Jul 2024 — Sekarang",
    },
    techStack: {
      eyebrow: "Kompetensi inti",
      title: "Stack teknologi",
      intro:
        "Teknologi yang saya gunakan untuk membangun produk yang kuat dan siap skala.",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & infrastruktur",
    },
    process: {
      eyebrow: "Freelance",
      title: "Skema pemesanan proyek",
      subtitle:
        "Alur ringkas dari pertama kali menghubungi hingga website live, supaya prosesnya transparan di setiap tahap.",
      steps: [
        {
          title: "Hubungi saya",
          description:
            "Mulai dari pesan singkat lewat form kontak atau kanal yang tersedia. Ceritakan gambaran besar proyek Anda.",
          ctaLabel: "Buka kontak",
        },
        {
          title: "Diskusi proyek",
          description:
            "Kita rapikan requirement, kesepakatan harga, dan estimasi waktu pengerjaan agar ekspektasi sama di awal.",
        },
        {
          title: "Uang muka (DP)",
          description:
            "Setelah deal, DP dibayarkan untuk mengamankan slot pengerjaan dan memulai development.",
        },
        {
          title: "Pengerjaan proyek",
          description:
            "Implementasi fitur, integrasi, dan penyempurnaan sesuai scope yang disepakati, dengan update progres bila perlu.",
        },
        {
          title: "Peninjauan hasil",
          description:
            "Demo atau preview hasil kerja untuk Anda tinjau; revisi wajar disesuaikan dengan kesepakatan awal.",
        },
        {
          title: "Pelunasan",
          description:
            "Setelah hasil disetujui, sisa pembayaran dilunasi sebelum go-live.",
        },
        {
          title: "Deploy website",
          description:
            "Website dipublikasikan ke hosting/production dan diserahkan beserta ringkasan yang diperlukan.",
        },
      ],
    },
    services: {
      eyebrow: "Freelance",
      title: "Tipe website yang bisa dipesan",
      subtitle:
        "Gambaran layanan yang bisa dibantu — detail scope dan fitur dirundingkan saat diskusi proyek.",
      items: [
        {
          title: "Website landing page",
          examples:
            "Landing page perusahaan, sekolah, UMKM, organisasi, dan sejenisnya.",
        },
        {
          title: "Website undangan",
          examples:
            "Undangan pernikahan, khitanan, ulang tahun, dan acara lainnya.",
        },
        {
          title: "Website information management",
          examples: "Sekolah, rumah sakit, organisasi, dan kebutuhan serupa.",
        },
        {
          title: "Website sistem booking",
          examples:
            "Booking lapangan futsal, basket, padel, barbershop, salon, dan lainnya.",
        },
        {
          title: "Website sales & inventory management",
          examples: "Penjualan, stok barang, dan operasional toko atau gudang.",
        },
        {
          title: "Website e-commerce",
          examples: "Toko online dengan katalog, keranjang, dan checkout.",
        },
        {
          title: "Custom & lainnya",
          examples: "Solusi web disesuaikan dengan kebutuhan dan keinginan klien.",
        },
      ],
    },
    contact: {
      eyebrow: "Hubungi saya",
      headlineLine1: "Mari kita bangun sesuatu yang",
      headlineAccent: "luar biasa",
      headlineLine2: "bersama.",
      intro:
        "Terbuka untuk proyek freelance dan kolaborasi teknis. Kirim pesan dan mulai percakapan.",
      responseTitle: "Waktu respons",
      responseLead: "Biasanya dalam ",
      responseHours: "24 jam",
      responseTrail:
        ". Sertakan konteks dan perkiraan waktu yang Anda inginkan.",
      labelName: "Nama",
      labelEmail: "Email",
      labelEmailHint: "Saya akan membalas ke alamat ini.",
      labelWhatsapp: "WhatsApp (opsional)",
      labelWhatsappHint:
        "Jika diisi, saya bisa menghubungi Anda lewat WhatsApp untuk follow-up lebih cepat.",
      placeholderWhatsapp: "+62 812 3456 7890",
      labelMessage: "Pesan",
      placeholderName: "Nama Anda",
      placeholderEmail: "nama@email.com",
      placeholderMessage: "Ceritakan proyek Anda...",
      submit: "Kirim pesan",
      submitting: "Mengirim...",
      successTitle: "Terima kasih — pesan Anda terkirim.",
      successHint: "Saya akan membalas email Anda sesegera mungkin.",
      errorRetry: "Coba lagi dalam beberapa saat.",
      errorGeneric: "Gagal mengirim pesan.",
    },
  },
};
