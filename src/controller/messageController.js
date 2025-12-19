import { getMessageServide } from '../service/messageService';

export const getMessageController = async (req, res) => {
  try {
    const response = await getMessageServide(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20
    );
    return res
      .status(StatusCode.OK)
      .json(successResponse(response, 'Message Fetched Successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
