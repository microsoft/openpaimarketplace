import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

import Card from './card';

const Description = props => {
  const { content } = props;

  return (
    <Card className='markdown-body' style={{ paddingTop: 15, paddingLeft: 10 }}>
      <ReactMarkdown source={content} />
    </Card>
  );
};

Description.propTypes = {
  content: PropTypes.string,
};

export default Description;
