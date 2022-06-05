import React from 'react';
import { useLinkClickHandler, To } from 'react-router-dom';
import { Result, Button } from 'antd';

interface ErrorProps {
  goBackText?: string;
  goBackPath?: string | To;
}

function Error({ goBackText, goBackPath }: ErrorProps) {
  const handleOnReloadClick = () => {
    window.location.reload();
  };
  const handleOnGoBack = useLinkClickHandler(goBackPath ?? '/');

  return (
    <Result
      status="500"
      title="Sorry, something was wrong. Please try reload page"
      extra={
        <Button.Group>
          <Button type="primary" onClick={handleOnReloadClick}>
            Reload
          </Button>
          {goBackText && (
            <Button type="primary" onClick={handleOnGoBack}>
              {goBackText}
            </Button>
          )}
        </Button.Group>
      }
    />
  );
}

export default Error;
