export const utilModule = {
    getByteSize: (str: string, byte: number, i: number): number => {
        for (byte = i = 0; i < str.length; ++i) {
            (str.charCodeAt(i) > 127) ? byte += 2 : byte++;
        }

        return byte;
    },

    getTogglePopup(elm: any): void {
        elm.classList.toggle('on');
    },

    getFileFromBlob(blob: Blob, name: string): File {
        blob['lastModifiedDate'] = new Date();
        blob['name'] = name;

        return <File>blob;
    }
};
