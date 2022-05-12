import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/types/role.enum';
import { Roles } from 'src/decorators/roles.decorators';

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { RolesGuard } from './../auth/guards/roles.guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllProducts() {
    return 'products';
  }
}
