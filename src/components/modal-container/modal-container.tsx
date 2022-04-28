import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { closeAllModal } from '../../store/app-slice/app-slice';

interface ModalContainerProps {
  className: string;
  children: ReactNode;
}

function ModalContainer({ className, children }: ModalContainerProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleModalCloseKeydowm = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        dispatch(closeAllModal());
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleModalCloseKeydowm);

    return () => {
      document.removeEventListener('keydown', handleModalCloseKeydowm);
    };
  }, [dispatch]);

  const handleModalCloseClick = () => {
    dispatch(closeAllModal());
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`modal is-active ${className}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalCloseClick} />
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
