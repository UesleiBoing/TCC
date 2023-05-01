import { MouseEvent } from 'react';

export function handleMouseOverImage(
    e: MouseEvent<HTMLImageElement>,
    dropzoneField: HTMLElement | null,
    dropzoneImageMouse: HTMLImageElement | null
) {
    if (dropzoneField && dropzoneImageMouse) {
        dropzoneField.style.display = 'none';
        dropzoneImageMouse.style.display = 'block';
        dropzoneImageMouse.src = e.currentTarget.src;
        dropzoneImageMouse.alt = e.currentTarget.alt;
    }
};

