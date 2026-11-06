import { offices } from "@/config/offices";
import { siteConfig } from "@/config/site";
import { caseHref, serviceHref, type Case, type Service } from "@/lib/catalog";
import { insightHref, type Insight } from "@/lib/insights";
import { personHref, type Person } from "@/lib/people";

const absolute = (path: string) => new URL(path, siteConfig.siteUrl).toString();

const headquarters = offices.find((office) => office.hq) ?? offices[0];

const organization = {
  "@type": "ProfessionalService",
  "@id": absolute("/#organization"),
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.siteUrl,
  logo: absolute("/favicon.svg"),
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: headquarters
    ? {
        "@type": "PostalAddress",
        streetAddress: headquarters.address[0],
        addressLocality: headquarters.city,
        addressCountry: headquarters.country,
      }
    : undefined,
  sameAs: siteConfig.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": absolute("/#website"),
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": absolute("/#organization") },
    },
  ],
});

const author = (person: Person) => ({
  "@type": "Person",
  name: person.data.name,
  jobTitle: person.data.role,
  url: absolute(personHref(person)),
});

export const insightSchema = (entry: Insight, authors: Person[], image?: string) => {
  const { event } = entry.data;
  const main = event
    ? {
        "@type": "Event",
        name: entry.data.title,
        description: entry.data.description,
        image: image ? absolute(image) : undefined,
        startDate: event.start.toISOString(),
        endDate: event.end?.toISOString(),
        eventAttendanceMode:
          event.format === "Online"
            ? "https://schema.org/OnlineEventAttendanceMode"
            : event.format === "Hybrid"
              ? "https://schema.org/MixedEventAttendanceMode"
              : "https://schema.org/OfflineEventAttendanceMode",
        location:
          event.format === "Online"
            ? { "@type": "VirtualLocation", url: event.registerUrl ?? absolute(insightHref(entry)) }
            : { "@type": "Place", name: event.venue, address: event.city },
        organizer: { "@id": absolute("/#organization") },
        performer: authors.map(author),
      }
    : {
        "@type": entry.data.report ? "Report" : "Article",
        headline: entry.data.title,
        description: entry.data.description,
        image: image ? absolute(image) : undefined,
        datePublished: entry.data.date.toISOString(),
        dateModified: (entry.data.updated ?? entry.data.date).toISOString(),
        author: authors.map(author),
        publisher: { "@id": absolute("/#organization") },
        mainEntityOfPage: absolute(insightHref(entry)),
        inLanguage: siteConfig.language,
      };
  return {
    "@context": "https://schema.org",
    "@graph": [
      main,
      organization,
      breadcrumbs([
        { name: "Insights", path: "/insights/" },
        { name: entry.data.title, path: insightHref(entry) },
      ]),
    ],
  };
};

export const serviceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: service.data.title,
      description: service.data.description,
      serviceType: service.data.title,
      provider: { "@id": absolute("/#organization") },
      url: absolute(serviceHref(service)),
    },
    organization,
    breadcrumbs([
      { name: "Services", path: "/services/" },
      { name: service.data.title, path: serviceHref(service) },
    ]),
  ],
});

export const caseSchema = (item: Case) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: item.data.title,
      description: item.data.description,
      publisher: { "@id": absolute("/#organization") },
      mainEntityOfPage: absolute(caseHref(item)),
      inLanguage: siteConfig.language,
    },
    organization,
    breadcrumbs([
      { name: "Our work", path: "/work/" },
      { name: item.data.title, path: caseHref(item) },
    ]),
  ],
});

export const personSchema = (person: Person) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      ...author(person),
      email: person.data.email,
      sameAs: person.data.linkedin ? [person.data.linkedin] : undefined,
      worksFor: { "@id": absolute("/#organization") },
    },
    organization,
    breadcrumbs([
      { name: "People", path: "/people/" },
      { name: person.data.name, path: personHref(person) },
    ]),
  ],
});

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});
