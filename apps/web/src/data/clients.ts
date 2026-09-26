export type Client = {
  name: string
  url: string
  kind: string
  summary: string
  detail: string
  theme: string
  image?: string
  description?: string
  credit?: "collaboration" | "growfore"
}

export const clients: Client[] = [
  {
    name: "Hex Healing Hub Pokhara",
    url: "https://hexhealinghubpokhara.com/",
    kind: "Wellness",
    theme: "hex-healing-hub",
    summary: "Energy healing and hypnotherapy in Pokhara",
    detail:
      "Hex Healing Hub offers energy healing, chakra sessions, sound healing, hypnotherapy and meditation with Umesh Gautam in Lakeside, Pokhara. We built a calm, direct path to understand each service and book an online or in-person session.",
  },
  {
    name: "Hope Fertility",
    url: "https://hopefertility.com.np/",
    kind: "Healthcare",
    theme: "hope-fertility",
    summary: "Compassionate fertility care in Pokhara",
    detail:
      "Hope Fertility & IVF Centre helps couples navigate diagnosis, treatment and ongoing care with a team of fertility specialists and embryologists.",
  },
  {
    name: "SADP Nepal",
    url: "http://sadpnepal.org/",
    kind: "Non-profit",
    theme: "sadp-nepal",
    summary: "A home for farmers, volunteers and donors",
    detail:
      "SADP Nepal supports Nepal's farmers with training, market access and regenerative organic practice — 500+ farmers trained, 20+ communities supported, 15k trees planted. We built the site that tells that story: the mission up front, programmes and volunteering easy to find, and a clear path for anyone who wants to join in.",
  },
  {
    name: "Walk Through Nepal",
    url: "https://walkthroughnepal.com/",
    kind: "Trekking",
    theme: "walk-through-nepal",
    image: "/work/walk-through-nepal.jpg",
    description:
      "A travel website with structured trips, destinations, editorial pages and search.",
    summary: "Every step, a new story",
    detail:
      "15+ destinations, tailor-made journeys and trips like the Upper Mustang trek. Editorial pages and instant search across trips and blogs, built for a company that wins travellers by knowing Nepal from the inside.",
    credit: "growfore",
  },
  {
    name: "Essence Treks Nepal",
    url: "https://essencetreksnepal.com/",
    kind: "Trekking",
    theme: "essence-treks-nepal",
    image: "/work/essence-treks.jpg",
    description:
      "A trekking website built around trip facts, itineraries, pricing and enquiries.",
    summary: "Soulful Himalayan expeditions, easy to compare",
    detail:
      "Essence runs custom treks, tours and the classic routes — Everest, Annapurna, Langtang. We built trip pages around what travellers actually decide on: days, difficulty, price from, and a plain 'design your trip' path. Their 4.9 Google rating sits where new visitors can see it.",
    credit: "growfore",
  },
  {
    name: "Into Nepal Treks",
    url: "https://new.intonepaltreks.com",
    kind: "Trekking",
    theme: "into-nepal-treks",
    image: "/work/into-nepal-treks.jpg",
    description:
      "A rebuild that organizes trips, tours, activities and more than a decade of content.",
    summary: "A full rebuild of an ageing site",
    detail:
      "Private, customised Nepal journeys since 2012. We moved a decade of trip content onto a faster foundation, added search and clear ways to travel — treks, tours, hikes, adventure sports, homestays — and kept the founder's own voice in the story.",
    credit: "growfore",
  },
  {
    name: "Limestone Treks",
    url: "https://limestonetreks.com/",
    kind: "Trekking",
    theme: "limestone-treks",
    summary: "A small operator that reads like a big one",
    detail:
      "Led by lifelong guide Yam Prasad Poudel, Limestone sells on trust. Photography-led pages, a tidy catalogue with real prices, WhatsApp one tap away, and fast loading on the connections their travellers are actually on.",
    credit: "growfore",
  },
  {
    name: "Summit Luxury Treks",
    url: "https://summitluxurytreks.com/",
    kind: "Trekking",
    theme: "summit-luxury-treks",
    image: "/work/summit-luxury-treks.jpg",
    description:
      "A calm, photography-led website for private treks and custom itineraries.",
    summary: "A premium feel for premium journeys",
    detail:
      "Curated lodges, private itineraries and 24/7 support deserve a site that doesn't feel like a price list. Generous spacing, calm typography, guide Gobinda Subedi front and centre, and a customise-your-trip request that takes under a minute.",
    credit: "growfore",
  },
  {
    name: "Hi Nepal Treks",
    url: "https://hinepaltreks.com/",
    kind: "Trekking",
    theme: "hi-nepal-treks",
    summary: "Twenty years of trips, finally organised",
    detail:
      "Hi Nepal Travels & Treks has run Nepal, Bhutan and Tibet trips for over 20 years, plus rafting, bungee, paragliding and ziplining. We gave all of it one structure — destinations, activities, a trip planner and a booking form — so a first-time visitor can plan without three rounds of email.",
    credit: "growfore",
  },
  {
    name: "Lovely Trips Nepal",
    url: "https://lovelytrips.com.np",
    kind: "Travel",
    theme: "lovely-trips-nepal",
    summary: "Tours presented with a lighter touch",
    detail:
      "Short tours, day trips and packages laid out for browsing rather than studying, with enquiry forms people actually finish on a phone.",
    credit: "growfore",
  },
  {
    name: "TMH Adventure",
    url: "https://tmhadventure.com/",
    kind: "Adventure",
    theme: "tmh-adventure",
    summary: "Nepal's sky safari, above the mountains",
    detail:
      "Ultralight flights, heli tours, hot air balloons, paragliding, bungee and skydiving out of Pokhara. A bold, pared-back site that lets the aerial photography do the selling and keeps booking one click from every page.",
    credit: "growfore",
  },
]
