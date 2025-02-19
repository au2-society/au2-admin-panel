import * as z from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z0-9_.+-]+\.e\d+@cumail\.in$/i, "Must be a valid university email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
})

export const resetSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z0-9_.+-]+\.e\d+@cumail\.in$/i, "Must be a valid university email"),
})

export const adminProfileSchema = z.object({
  username: z.string().min(3),
  fullName: z.string().min(2),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  bio: z.string().max(500).optional(),
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z0-9_.+-]+\.e\d+@cumail\.in$/i),
})

export const eventSchema = z.object({
  heading: z.string().min(3, "Title must be at least 3 characters"),
  subHeading: z.string().min(10, "Sub heading must be at least 10 characters"),
  category: z.enum(["cultural", "technical", "sports"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  venue: z.string().min(3, "Venue must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  photo: z.instanceof(File).refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "File size must be less than 5MB"
  ),
});

export type EventFormData = z.infer<typeof eventSchema>;