import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SeedService } from './seed/seed.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private seedService: SeedService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedService.execute();
  }
}
