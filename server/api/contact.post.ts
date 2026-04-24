import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    const { name, email, msg } = await readBody(event);

    if (!name || !email || !msg) {
        throw createError({ statusCode: 400, message: "Missing fields" });
    }

    const config = useRuntimeConfig();
    const appPassword = config.gmailAppPassword;

    if (!appPassword) {
        throw createError({ statusCode: 500, message: "Mail not configured" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "hydrotinker@gmail.com",
            pass: appPassword,
        },
    });

    await transporter.sendMail({
        from: "hydrotinker@gmail.com",
        to: "hydrotinker@gmail.com",
        subject: "New Contact Message",
        text: `Name: ${name}\nFrom: ${email}\n\n${msg}`,
    });

    return { ok: true };
});
