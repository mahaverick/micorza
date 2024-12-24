import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

import { userModel } from './user.model'

/* eslint-disable no-unused-vars */
export enum ProviderType {
  EMAIL = 'email',
  GOOGLE = 'google',
  APPLE = 'apple',
  MICROSOFT = 'microsoft',
}
/* eslint-enable no-unused-vars */

/**
 * Providers table
 */
export const providerModel = pgTable('providers', {
  id: serial('id').primaryKey().unique().notNull(),

  // User relationship
  userId: integer('user_id')
    .references(() => userModel.id, { onDelete: 'cascade' })
    .notNull(),
  type: varchar('type', { length: 255 }).notNull().default(ProviderType.EMAIL),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),

  // Provider status fields
  active: boolean('active').default(false).notNull(),

  deletedAt: timestamp('deleted_at', {
    withTimezone: true,
    mode: 'date',
  }),
  // Timestamps
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
})

export const providerRelations = relations(providerModel, ({ one }) => ({
  user: one(userModel, {
    fields: [providerModel.userId],
    references: [userModel.id],
  }),
}))

export type Provider = InferSelectModel<typeof providerModel>
export type InsertProvider = InferInsertModel<typeof providerModel>
