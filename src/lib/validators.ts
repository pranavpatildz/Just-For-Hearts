import { z } from "zod";

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6),
});

export const doctorSchema = z.object({ name: z.string().min(2), specialization: z.string().min(2), bio: z.string().optional(), isActive: z.boolean().optional(),
});

export const programSchema = z.object({ title: z.string().min(3), description: z.string().min(5), isPublished: z.boolean().optional(),
});

export const appointmentSchema = z.object({ patientName: z.string().min(2), patientEmail: z.string().email(), doctorId: z.string(), date: z.string(),
});

export const contactSchema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(5),
});