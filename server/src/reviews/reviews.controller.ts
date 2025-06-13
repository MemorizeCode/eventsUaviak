import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsDTO } from './dto/ReviewsDTO';
import { AdminGuard } from 'src/guard/admin.guard';
import { query } from 'express';

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

  @UseGuards(AdminGuard)
  @Get("/getReviewsAdmin")
  @HttpCode(200)
  async getReviewsAdmin(){
    return await this.reviewsService.getReviewsAdmin()
  }

  @UseGuards(AdminGuard)
  @Put("/confirmReviews")
  @HttpCode(200)
  async confirmReviews(@Query() query){
    const { id } = query;
    const result = await this.reviewsService.confirmReviews(Number(id));
    return result;
  }


  @Get('/getReviews')
  @HttpCode(200)
  async getReviews() {
    const result = await this.reviewsService.getReviews();
    return result;
  }
}
