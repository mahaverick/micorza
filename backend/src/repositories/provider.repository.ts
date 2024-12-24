import { and, eq } from 'drizzle-orm'

import { InsertProvider, providerModel, ProviderType } from '@/database/models/provider.model'
import { BaseRepository } from '@/repositories/base.repository'
import db from '@/services/db.service'

export class ProviderRepository extends BaseRepository {
  /**
   * Find a provider by user ID and provider type
   * @param userId - The ID of the user
   * @param type - The type of the provider
   * @returns The found provider or undefined if not found
   * @memberof ProviderRepository
   */
  async findByUserIdAndType(userId: number, type: ProviderType) {
    const [provider] = await db
      .select()
      .from(providerModel)
      .where(and(eq(providerModel.userId, userId), eq(providerModel.type, type)))
      .limit(1)
    return provider
  }

  /**
   * Get all active providers for a given user
   * @param userId - The ID of the user
   * @returns An array of active providers
   * @memberof ProviderRepository
   */
  async getActiveProviders(userId: number) {
    return db
      .select()
      .from(providerModel)
      .where(and(eq(providerModel.userId, userId), eq(providerModel.active, true)))
  }

  /**
   * Upsert (insert or update) a provider
   * @param data - The provider data to upsert
   * @returns The upserted provider
   * @memberof ProviderRepository
   */
  async upsert(data: InsertProvider) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, type, ...rest } = data
    const existingProvider = await this.findByUserIdAndType(userId, type as ProviderType)

    if (existingProvider) {
      // Update existing provider
      const [updatedProvider] = await db
        .update(providerModel)
        .set(rest)
        .where(and(eq(providerModel.userId, userId), eq(providerModel.type, type as ProviderType)))
        .returning()
      return updatedProvider
    } else {
      // Insert new provider
      const [newProvider] = await db.insert(providerModel).values(data).returning()
      return newProvider
    }
  }

  /**
   * Delete a provider by its ID
   *
   * @param {number} id - The ID of the provider to delete
   * @memberof ProviderRepository
   */
  async delete(id: number) {
    await db.delete(providerModel).where(eq(providerModel.id, id))
  }

  /**
   * Deactivate provider by its ID
   *
   * @param {number} providerId - The ID of the provider to deactivate
   * @returns The deactivated provider
   * @memberof ProviderRepository
   */
  async deactivateProvider(providerId: number) {
    const [provider] = await db
      .update(providerModel)
      .set({ active: false })
      .where(eq(providerModel.id, providerId))
      .returning()
    return provider
  }
}
