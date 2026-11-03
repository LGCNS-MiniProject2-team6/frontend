import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { usePanelMotion } from '@/hooks/usePanelMotion';
import { Button } from '@/components/button';

import * as S from './WarningModal.styles';
import type { WarningModalProps } from './WarningModal.types';

export default function WarningModal({
  title,
  description,
  cancelLabel = '취소',
  confirmLabel,
  onCancel,
  onConfirm,
  confirmLoading = false,
}: WarningModalProps) {
  const motion = usePanelMotion('popup');
  const { enter, close: animateClose } = motion;
  useEffect(() => {
    enter();
  }, [enter]);
  const cancel = () => {
    if (!confirmLoading) void animateClose(onCancel);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !confirmLoading) void animateClose(onCancel);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, confirmLoading, animateClose]);

  return createPortal(
    <S.Overlay
      ref={motion.backdrop as React.RefObject<HTMLDivElement>}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) cancel();
      }}
    >
      <S.Popup
        ref={motion.panel as React.RefObject<HTMLDivElement>}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="warning-modal-title"
      >
        <S.IconBadge aria-hidden>!</S.IconBadge>
        <S.Title id="warning-modal-title">{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
        <S.Actions>
          <Button variant="secondary" onClick={cancel} disabled={confirmLoading}>
            {cancelLabel}
          </Button>
          <Button variant="warning" onClick={onConfirm} loading={confirmLoading}>
            {confirmLabel}
          </Button>
        </S.Actions>
      </S.Popup>
    </S.Overlay>,
    document.body,
  );
}
