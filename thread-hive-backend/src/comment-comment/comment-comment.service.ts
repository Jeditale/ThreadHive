import { Injectable } from '@nestjs/common';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';

@Injectable()
export class CommentCommentService {
  create(createCommentCommentDto: CreateCommentCommentDto) {
    return 'This action adds a new commentComment';
  }

  findAll() {
    return `This action returns all commentComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentComment`;
  }

  update(id: number, updateCommentCommentDto: UpdateCommentCommentDto) {
    return `This action updates a #${id} commentComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentComment`;
  }
}
