import { SetMetadata } from '@nestjs/common';
import { TipoRol } from '../interfaces/roles/roles.interface';

export const ROLES_KEY = 'tipoRol';

export const Roles = (...args: TipoRol[]) => SetMetadata(ROLES_KEY, args);
