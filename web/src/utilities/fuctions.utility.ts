/**
 * Allows downloading a blob file
 * @param {Blob} httpResTypeBlob
 * @param {String} name
 */
export const downloadFile = (httpResTypeBlob: Blob, name: string): void => {
    const url = window.URL.createObjectURL(new Blob([httpResTypeBlob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name); // or any other extension
    document.body.appendChild(link);
    link.click();
};

/**
 * Allows you to download a file via url
 * @param {String} url
 */
export const downloadFileByUrl = (url: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
};
