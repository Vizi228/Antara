import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Operation, Status } from '@app/common';

@Injectable()
export class ReceiverService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async getAll(): Promise<Operation[]> {
    const keys = await this.cacheManager.store.keys();
    const operations: Operation[] = [];
    for (const key of keys) {
      const operation = await this.cacheManager.get(key);
      operations.push(operation as Operation);
    }
    return operations;
  }

  public async saveOperation(operation: Operation): Promise<Operation> {
    await this.cacheManager.set(operation.id, operation);

    await new Promise((resolve) =>
      setTimeout(async () => {
        operation.status = Status.InProgress;
        await this.cacheManager.set(operation.id, operation);
        resolve(void 0);
      }, 2000),
    );

    await new Promise((resolve) =>
      setTimeout(async () => {
        operation.status = Status.Done;
        await this.cacheManager.set(operation.id, operation);
        resolve(void 0);
      }, 10000),
    );

    return operation;
  }

  public async getStatus(id: string): Promise<Status> {
    const operation: Operation = await this.cacheManager.get(id);
    return operation.status;
  }

  public async clear(): Promise<void> {
    const keys = await this.cacheManager.store.keys();
    for (const key of keys) {
      const operation: Operation = await this.cacheManager.get(key);
      if (operation.status === Status.Done) {
        await this.cacheManager.del(key);
      }
    }
  }
}
