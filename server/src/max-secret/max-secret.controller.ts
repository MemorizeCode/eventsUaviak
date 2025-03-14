import { Controller } from '@nestjs/common';
import { MaxSecretService } from './max-secret.service';

@Controller('max-secret')
export class MaxSecretController {
  constructor(private readonly maxSecretService: MaxSecretService) {}
}
