import { ICapsuleRepository } from "@/lib/repositories/ICapsuleRepository";
import { mockApiStore } from "@/lib/mockApiStore";
import { Letter, CreateLetterInput, UpdateRealityInput } from "@/types/timeecho";

export class MockCapsuleRepository implements ICapsuleRepository {
  async getAll(): Promise<Letter[]> {
    return mockApiStore.getAll();
  }

  async getById(id: string): Promise<Letter | null> {
    return mockApiStore.getById(id);
  }

  async create(input: CreateLetterInput): Promise<Letter> {
    return mockApiStore.create(input);
  }

  async updateReality(input: UpdateRealityInput): Promise<Letter> {
    return mockApiStore.updateReality(input);
  }

  async archive(id: string): Promise<Letter> {
    return mockApiStore.archive(id);
  }

  async restore(id: string): Promise<Letter> {
    return mockApiStore.restore(id);
  }

  async delete(id: string): Promise<void> {
    mockApiStore.delete(id);
  }
}
