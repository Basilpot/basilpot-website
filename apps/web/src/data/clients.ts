export type Client = {
  name: string
  url: string
  kind: string
  summary: string
  detail: string
  theme: string
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
]