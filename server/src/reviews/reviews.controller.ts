import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsDTO } from './dto/ReviewsDTO';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/createReviews')
  @HttpCode(200)
  async createViews(@Body() body: ReviewsDTO, @Req() req) {
    const secretKey = req.headers['secret-key'];
    const result = await this.reviewsService.createViews(body, secretKey);
    return result;
  }

  @UseGuards(AdminGuard)
  @Delete('/deleteReviews')
  @HttpCode(200)
  async deleteReviews(@Query() query) {
    const { id } = query;
    const result = await this.reviewsService.deleteReview(id);
    return result;
  }

  @Get('/getReviews')
  @HttpCode(200)
  async getReviews() {
    const result = await this.reviewsService.getReviews();
    return result;
  }
}
