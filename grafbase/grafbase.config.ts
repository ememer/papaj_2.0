import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 3, max: 20 }),
    displayName: g.string().length({ min: 3, max: 15 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
