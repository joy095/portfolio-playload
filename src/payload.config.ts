import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/projects'
import { Header } from './Header/config'
import { Footer } from './Footer/config'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Header, Footer],
  collections: [Users, Pages, Posts, Categories, Media, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: 'joykarmakar852@gmail.com',
    defaultFromName: 'Joy',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  plugins: [
    formBuilderPlugin({
      // plugin options here (e.g., fields, formOverrides)
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'img', // 1. Pass your folder prefix here
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            // Pull your Cloudflare Worker URL
            const workerUrl = process.env.R2_PUBLIC_URL || ''

            // Clean the URL just in case there's a trailing slash in your .env
            const cleanUrl = workerUrl.endsWith('/') ? workerUrl.slice(0, -1) : workerUrl

            // 2. Because you passed 'img' above, this key will become 'img/your-uuid.webp'
            const key = prefix ? `${prefix}/${filename}` : filename
            // 3. Return the clean URL combined with the prefixed key
            return `${cleanUrl}/${key}`
          },
        },
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],

  localization: {
    locales: ['en', 'de'], // Add your supported languages
    defaultLocale: 'en', // Set the default language
    fallback: true, // Fall back to the default locale if a translation is missing
  },
})
