export function handleMouseOutImage(
    dropzoneField: HTMLElement | null,
    dropzoneImageMouse: HTMLImageElement | null
) {
    if (dropzoneField && dropzoneImageMouse) {
        dropzoneField.style.display = 'flex';
        dropzoneImageMouse.style.display = 'none';
    }
};