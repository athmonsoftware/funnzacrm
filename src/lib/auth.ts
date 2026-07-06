import { betterAuth } from "better-auth";
import { Pool } from "pg"

export const auth = betterAuth({
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
	}),
	session: {
		expiresIn: 60 * 60 * 24 * 2,
		updateAge: 60 * 60 * 6,
	},
	trustedOrigins: [
		"https://funnzacrm.vercel.app",
	],
	advanced: {
        useSecureCookies: true
    }
});