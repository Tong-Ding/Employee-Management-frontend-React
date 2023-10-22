// import { Button, Result } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import { Result, Button } from 'antd'
import { history } from '@umijs/max'

const NoFoundPage = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={[
        <Button key='back' type='primary' onClick={() => history.back()}>
          Back to Previous Page
        </Button>,
        <Button key='home' type='primary' onClick={() => history.push('/')}>
          Return to Homepage
        </Button>
      ]}
    />
  )
}
export default NoFoundPage
