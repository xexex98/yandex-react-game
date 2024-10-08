import { Reply } from '../models/reply'
import { CommentDTO, CommentReply } from '../dto/comment'
import { Comment } from '../models/comment'
import { Pagination } from '../types/Pagination'

class CommentService {
  async create(data: CommentDTO) {
    try {
      await Comment.create(data)
    } catch (e) {
      console.error(e)
      throw new Error('Ошибка создания comment')
    }
  }

  async getCommentByTopic(topicId: number, pagination?: Pagination) {
    try {
      const comments = await Comment.findAll({
        where: {
          topicId,
        },
        include: {
          model: Reply,
          attributes: [
            'id',
            'value',
            'idUser',
            'replyId',
            'commentId',
            'createdAt',
          ],
        },
      })

      const comentsReplyPaginations = comments.reduce((res, item) => {
        const arr = [...item.reply] as Array<CommentReply>
        arr.push({
          id: item.id,
          value: item.value,
          idUser: item.idUser,
          createdAt: item.createdAt,
        })
        res = [...res, ...arr]
        return res
      }, [] as Array<CommentReply>)

      comentsReplyPaginations.sort((a, b) => +b.createdAt - +a.createdAt)

      if (pagination) {
        const { page, limit } = pagination
        return {
          rows: comentsReplyPaginations.slice(limit * (page - 1), limit * page),
          totalPage: Math.ceil(comentsReplyPaginations.length / limit),
          page: page,
        }
      }

      return comentsReplyPaginations
    } catch (e) {
      console.error(e)
      throw new Error('Ошибка получение comment')
    }
  }
}

export default new CommentService()
