import React, { useState } from 'react';
import Img from 'next/image';
import { imageUrl } from '@curated-property/utils';
import {
  ImageModalImage,
  ImageModal,
} from '@curated-property/shared-components';
import { CloseIcon } from '@curated-property/icons';
import { useTranslation } from 'react-i18next';

interface Props {
  galleries: {
    galleryTitle?: string;
    galleryThumbnail?: {
      sourceUrl?: string;
      altText?: string;
    };
    galleryImages?: ImageModalImage[];
  }[];
}

interface ActiveGalleryState {
  id: number;
  lastFocussedElement: HTMLButtonElement | null;
}

export function ImageGallery({ galleries }: Props) {
  const [modalActive, setModalActive] = useState(false);
  const [activeGallery, setActiveGallery] = useState<ActiveGalleryState>({
    id: 0,
    lastFocussedElement: null,
  });

  function open() {
    if (!galleries) {
      return;
    }
    setModalActive(true);
    document.querySelector('html')?.classList.add('overflow-hidden');
  }

  function close() {
    if (!galleries) {
      return;
    }
    setModalActive(false);
    activeGallery?.lastFocussedElement?.focus();
    document.querySelector('html')?.classList.remove('overflow-hidden');
  }

  return (
      <div className="container px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries?.map((gallery, key) => {
          return (
            <GalleryItem
              key={key}
              id={key}
              thumbImg={gallery?.galleryThumbnail?.sourceUrl}
              thumbAlt={gallery?.galleryThumbnail?.altText}
              galleryTitle={gallery?.galleryTitle}
              open={open}
              active={setActiveGallery}
              modalActive={modalActive}
            />
          );
        })}
        <ImageModal
          images={galleries?.[activeGallery.id]?.galleryImages}
          title={galleries?.[activeGallery.id]?.galleryTitle}
          close={close}
          active={modalActive}
        />
      </div>
  );
}

interface GalleryItemProps {
  id?: number | undefined;
  thumbImg?: string | undefined;
  thumbAlt?: string | undefined;
  galleryTitle?: string | undefined;
  open?: any;
  active?: any;
  modalActive?: boolean;
}

function GalleryItem({
  id,
  thumbImg,
  thumbAlt,
  galleryTitle,
  open,
  active,
  modalActive,
}: GalleryItemProps) {
  const { t } = useTranslation();
  return (
    <div className="relative text-center">
      <div>
        <Img src={imageUrl(thumbImg)} alt={thumbAlt} width="540" height="390" />
        <div className="absolute transform translate-y-full bg-bg">
          <CloseIcon className="fill-current text-bg w-8 h-8" />
        </div>
      </div>
      <h2
        className="text-xl font-black leading-none font-headline md:text-3xl p-4"
        dangerouslySetInnerHTML={{ __html: galleryTitle || '' }}
      ></h2>

      <button
        className="absolute top-0 left-0 w-full h-full"
        data-testid="gallery-modal-trigger"
        aria-label={t('openGallery') + (galleryTitle || '')}
        onClick={(e) => {
          open();
          active({
            id: id,
            lastFocussedElement: e?.target,
          });
        }}
        aria-expanded={modalActive ? true : false}
      ></button>
    </div>
  );
}
