import { z } from "zod";

const salarySchema = z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    currency: z.string().min(1)
}).refine(
    (salary) => salary.max >= salary.min,
    {
        message: "Salary max must be greater than or equal to salary min",
        path: ["max"]
    }
);

export const createJobSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),

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
        z.string().min(1)
    ).min(1),

    category: z.string().min(1),

    deadline: z.coerce.date().refine(
        (date) => date > new Date(),
        {
            message: "Deadline must be in the future"
        }
    )
});

export const updateJobSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    location: z.string().min(1).optional(),

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
        z.string().min(1)
    ).min(1).optional(),

    category: z.string().min(1).optional(),

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