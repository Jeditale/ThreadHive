import { Test, TestingModule } from '@nestjs/testing';
import { CommentCommentController } from './comment-comment.controller';
import { CommentCommentService } from './comment-comment.service';

describe('CommentCommentController', () => {
  let controller: CommentCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentCommentController],
      providers: [CommentCommentService],
    }).compile();

    controller = module.get<CommentCommentController>(CommentCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
