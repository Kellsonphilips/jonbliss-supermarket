export const cookieTypes = [
  {
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.",
    examples: ["Authentication cookies", "Shopping cart cookies", "Security cookies"],
    duration: "Session or up to 1 year",
    canDisable: false
  },
  {
    name: "Performance Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    examples: ["Google Analytics", "Page load time tracking", "Error tracking"],
    duration: "Up to 2 years",
    canDisable: true
  },
  {
    name: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
    examples: ["Language preferences", "Region settings", "User interface preferences"],
    duration: "Up to 1 year",
    canDisable: true
  },
  {
    name: "Marketing Cookies",
    description: "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
    examples: ["Social media cookies", "Advertising network cookies", "Retargeting cookies"],
    duration: "Up to 2 years",
    canDisable: true
  }
]; 