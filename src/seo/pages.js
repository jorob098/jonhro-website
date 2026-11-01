// Single source of truth for page titles and descriptions.
// Used by <Seo /> in the browser and by the build step that writes a
// separate HTML file per page (so link previews and Google see the right tags).

export const SITE_URL = "https://www.jonhrorobles.com";
export const SHARE_IMAGE = `${SITE_URL}/images/share-card.png`;

export const PAGES = {
  "/": {
    title: "Customs Broker Cebu | Jonhro Robles - Import & Export Specialist",
    description:
      "Licensed customs broker in Cebu, Philippines. Jonhro Robles offers import/export clearance, customs documentation, and freight consulting services.",
  },
  "/about": {
    title: "About Jonhro Robles | Licensed Customs Broker in Cebu",
    description:
      "Licensed customs broker in Cebu since 2011. Learn how Jonhro Robles helps businesses with import/export compliance and fast customs clearance.",
  },
  "/services": {
    title: "Customs Brokerage Services | Jonhro Robles Cebu",
    description:
      "Import and export customs clearance, tariff consultation, freight coordination and cross docking from Cebu to key ports nationwide.",
  },
  "/contact": {
    title: "Contact Jonhro Robles | Customs Broker Cebu",
    description:
      "Get in touch with Jonhro Robles for customs brokerage inquiries in Cebu, Philippines. Call, message or send an inquiry online.",
  },
  "/blog": {
    title: "Cebu's Evolving Trade Landscape | Jonhro Robles Blog",
    description:
      "How customs modernization and stricter regulations are reshaping Cebu's trade environment, and why customs expertise matters more than ever.",
    type: "article",
  },
  "/rfq": {
    title: "Request a Quote | Jonhro Robles Customs Broker",
    description:
      "Request a customs brokerage quote from Jonhro Robles, licensed customs broker in Cebu, Philippines.",
  },
  "/privacy": {
    title: "Privacy Policy | Jonhro Robles Customs Broker",
    description:
      "How Jonhro Robles, licensed customs broker in Cebu, collects, uses and protects personal information under the Data Privacy Act of 2012.",
  },
  "/terms": {
    title: "Terms of Use | Jonhro Robles Customs Broker",
    description:
      "Terms for using www.jonhrorobles.com, including quotations, shipment tracking and website content.",
  },
};
