import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  website: text("website"),
  automationNeeds: text("automation_needs").notNull(),
  currentAiUse: text("current_ai_use").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  automationNeeds: z.string().min(10, "Please describe what you'd like to automate"),
  currentAiUse: z.string().min(2, "Please share your current AI use"),
  website: z.string().optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(),
  eventData: jsonb("event_data"),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  createdAt: true,
}).extend({
  eventType: z.enum(["page_view", "form_submit", "cta_click", "scroll_depth", "time_on_page"]),
});

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
