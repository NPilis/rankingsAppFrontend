import React from 'react';
import cls from './Center.module.css';

function Center(WrappedComponent) {
    return class extends React.Component {
      render() {
        return (
            <div className={cls.Center}>
                <WrappedComponent {...this.props} />
            </div>
        )
      }
    }
  }

  export default Center;