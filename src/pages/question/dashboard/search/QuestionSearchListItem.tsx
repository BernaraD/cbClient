import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IQuestion } from '@/pages/question/types';

interface IProps extends IQuestion {
  questionDelete: (id: String) => void;
}

const QuestionSearchListItem = (props: IProps) => {
  const { questionDelete } = props;

  const owner = get(props, 'item.owner', '');
  const questionId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => questionDelete(questionId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  questionDelete: (payload: any) => dispatch({ type: 'QuestionDashboard/questionDelete', payload }),
});

export default connect(null, mapDispatchToProps)(QuestionSearchListItem);
