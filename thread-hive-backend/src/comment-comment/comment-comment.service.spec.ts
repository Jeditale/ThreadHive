import { Test, TestingModule } from '@nestjs/testing';
import { CommentCommentService } from './comment-comment.service';

describe('CommentCommentService', () => {
  let service: CommentCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentCommentService],
    }).compile();

    service = module.get<CommentCommentService>(CommentCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
