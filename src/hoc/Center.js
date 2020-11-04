import React from 'react';
import cls from './Center.module.css';

function Center(WrappedComponent) {
    return class extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
      }
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