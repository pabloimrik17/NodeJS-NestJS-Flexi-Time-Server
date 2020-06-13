import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
  })

  it('should be defined', () => {
    expect(new RolesGuard(reflector)).toBeDefined();
  });
});
