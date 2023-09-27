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
const Meetings = g
  .model("Meetings", {
    createdBy: g.relation(() => User),
    date: g.string().optional(),
    range: g.string().optional().list().optional(),
    rescheduleDate: g.string().optional(),
    rescheduleRange: g.string().optional(),
    isAnnounced: g.boolean().default(false),
    acceptedBy: g.string().optional().list().optional(),
    rejectedBy: g.string().optional().list().optional(),
  })
  .auth((rules) => {
    rules.private().read();
    rules.private().create().delete().update();
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
