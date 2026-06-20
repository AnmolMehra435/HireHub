import { z } from "zod";

const salarySchema = z.object({
    min: z.number()
        .nonnegative()
        .max(100000000, "Salary cannot exceed 10 crore"),

    max: z.number()
        .nonnegative()
        .max(100000000, "Salary cannot exceed 10 crore"),

    currency: z.enum([
        "INR",
        "USD",
        "EUR"
    ])
}).refine(
    (salary) => salary.max >= salary.min,
    {
        message: "Salary max must be greater than or equal to salary min",
        path: ["max"]
    }
);

export const createJobSchema = z.object({
    title: z.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),

    description: z.string()
        .trim()
        .min(20, "Description must be at least 20 characters")
        .max(5000, "Description cannot exceed 5000 characters"),

    company: z.string()
        .trim()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name cannot exceed 100 characters"),

    location: z.string()
        .trim()
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location cannot exceed 100 characters"),

    type: z.enum([
        "full-time",
        "part-time",
        "contract",
        "internship"
    ]),

    experience: z.enum([
        "fresher",
        "1-2 years",
        "2-5 years",
        "5+ years"
    ]),

    salary: salarySchema,

    skills: z.array(
        z.string()
            .trim()
            .min(1, "Skill cannot be empty")
            .max(30, "Skill cannot exceed 30 characters")
    )
    .min(1, "At least one skill is required")
    .max(20, "Maximum 20 skills allowed"),

    category: z.string()
        .trim()
        .min(2, "Category must be at least 2 characters")
        .max(50, "Category cannot exceed 50 characters"),

    deadline: z.coerce.date().refine(
        (date) => date > new Date(),
        {
            message: "Deadline must be in the future"
        }
    )
});

export const updateJobSchema = z.object({
    title: z.string()
        .trim()
        .min(3)
        .max(100)
        .optional(),

    description: z.string()
        .trim()
        .min(20)
        .max(5000)
        .optional(),

    location: z.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    type: z.enum([
        "full-time",
        "part-time",
        "contract",
        "internship"
    ]).optional(),

    experience: z.enum([
        "fresher",
        "1-2 years",
        "2-5 years",
        "5+ years"
    ]).optional(),

    salary: salarySchema.optional(),

    skills: z.array(
        z.string()
            .trim()
            .min(1)
            .max(30)
    )
    .min(1)
    .max(20)
    .optional(),

    category: z.string()
        .trim()
        .min(2)
        .max(50)
        .optional(),

    deadline: z.coerce.date()
        .refine(
            (date) => date > new Date(),
            {
                message: "Deadline must be in the future"
            }
        )
        .optional(),

    status: z.enum([
        "open",
        "closed",
        "draft"
    ]).optional()
});